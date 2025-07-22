'use client'

import { useState, useEffect, useRef } from 'react'
import { Chat, Message } from './ChatTypes'

export function useChatLogic(initialChats: Chat[] = [], initialChatId: string | null = null) {
  const [chats, setChats] = useState<Chat[]>(initialChats)
  const [currentChatId, setCurrentChatId] = useState<string | null>(initialChatId)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [activeChat, setActiveChat] = useState<Chat | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    loadChats()
  }, [])

  useEffect(() => {
    if (currentChatId) {
      loadMessages()
      const chat = chats.find(c => c.id === currentChatId) || null
      setActiveChat(chat)
    } else {
      setMessages([])
      setActiveChat(null)
    }
  }, [currentChatId, chats])
  
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 10)
    }
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  useEffect(() => {
    if (isStreaming) {
      scrollToBottom()
      
      const scrollInterval = setInterval(scrollToBottom, 500)
      return () => clearInterval(scrollInterval)
    }
  }, [isStreaming])

  const loadChats = async () => {
    try {
      const response = await fetch('/api/chats')
      const data = await response.json()
      setChats(data)
    } catch (error) {
      console.error('Failed to load chats:', error)
    }
  }

  const loadMessages = async () => {
    if (!currentChatId) return
    
    try {
      const response = await fetch(`/api/chat/${currentChatId}`)
      const data = await response.json()
      setMessages(data.messages || [])
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const handleNewChat = async () => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Chat' })
      })
      const newChat = await response.json()
      setCurrentChatId(newChat.id)
      loadChats()
    } catch (error) {
      console.error('Failed to create new chat:', error)
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputMessage.trim() || !currentChatId || isStreaming) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setIsStreaming(true)
    
    abortControllerRef.current = new AbortController()
    
    try {
      const response = await fetch(`/api/chat/${currentChatId}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: inputMessage }),
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
        
        const chunk = new TextDecoder().decode(value)
        console.log('Received chunk:', chunk)
        
        buffer += chunk
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        
        console.log('Processing lines:', lines)
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(6)
              console.log('Parsing JSON:', jsonStr)
              
              const data = JSON.parse(jsonStr)
              console.log('Parsed data:', data)
              
              if (data.token && data.token.length > 0) {
                console.log('Adding token to message:', data.token)
                setMessages(prev => {
                  const updated = [...prev]
                  const lastMessage = updated[updated.length - 1]
                  if (lastMessage && lastMessage.role === 'assistant') {
                    if (!lastMessage.content.endsWith(data.token)) {
                      lastMessage.content += data.token
                    }
                  }
                  return updated
                })
              }
              if (data.done === true) {
                console.log('Stream complete')
                setIsStreaming(false)
                loadChats()
                return
              }
            } catch (e) {
              console.error('JSON parse error:', e, 'on line:', line)
            }
          } else {
            console.log('Ignoring non-data line:', line)
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
    
    if (currentChatId && isStreaming) {
      try {
        await fetch(`/api/chat/${currentChatId}/stop`, { method: 'POST' })
      } catch (error) {
        console.error('Failed to stop generation:', error)
      }
    }
    
    setIsStreaming(false)
    setIsLoading(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  return {
    chats,
    currentChatId,
    setCurrentChatId,
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    isStreaming,
    activeChat,
    messagesEndRef,
    handleNewChat,
    handleSendMessage,
    stopGeneration,
    scrollToBottom,
    formatDate
  }
}