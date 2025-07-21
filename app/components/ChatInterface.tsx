'use client'

import { useState, useEffect, useRef } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface ChatInterfaceProps {
  chatId: string | null
  onChatUpdate: () => void
}

export default function ChatInterface({ chatId, onChatUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (chatId) {
      loadMessages()
    } else {
      setMessages([])
    }
  }, [chatId])

  const loadMessages = async () => {
    if (!chatId) return
    
    try {
      const response = await fetch(`/api/chat/${chatId}`)
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const sendMessage = async (content: string) => {
    if (!chatId || isStreaming) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    setIsStreaming(true)

    // Create abort controller for this request
    abortControllerRef.current = new AbortController()

    try {
      const response = await fetch(`/api/chat/${chatId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
        signal: abortControllerRef.current.signal
      })

      if (!response.ok) throw new Error('Failed to send message')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)

      let buffer = ''
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += new TextDecoder().decode(value)
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              if (data.token && data.token.length > 0) {
                setMessages(prev => {
                  const updated = [...prev]
                  const lastMessage = updated[updated.length - 1]
                  if (lastMessage && lastMessage.role === 'assistant') {
                    // Check if the token is already at the end of the content to avoid duplication
                    if (!lastMessage.content.endsWith(data.token)) {
                      lastMessage.content += data.token
                    }
                  }
                  return updated
                })
              }
              if (data.done === true) {
                setIsStreaming(false)
                onChatUpdate()
                return // Exit the loop when done
              }
            } catch (e) {
              console.error('JSON parse error:', e)
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Failed to send message:', error)
      }
    } finally {
      setIsLoading(false)
      setIsStreaming(false)
      abortControllerRef.current = null
    }
  }

  const stopGeneration = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    if (chatId && isStreaming) {
      try {
        await fetch(`/api/chat/${chatId}/stop`, { method: 'POST' })
      } catch (error) {
        console.error('Failed to stop generation:', error)
      }
    }
    
    setIsStreaming(false)
    setIsLoading(false)
  }

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center text-gray-500">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Local ChatGPT</h2>
          <p>Select a chat or create a new one to get started</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput
        onSendMessage={sendMessage}
        isStreaming={isStreaming}
        onStopGeneration={stopGeneration}
      />
    </div>
  )
}