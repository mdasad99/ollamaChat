'use client'

import { useState, useRef, KeyboardEvent } from 'react'

interface MessageInputProps {
  onSendMessage: (content: string) => void
  isStreaming: boolean
  onStopGeneration: () => void
}

export default function MessageInput({ onSendMessage, isStreaming, onStopGeneration }: MessageInputProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isStreaming) {
      onSendMessage(message.trim())
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
    if (e.key === 'Escape' && isStreaming) {
      onStopGeneration()
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    
    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = 'auto'
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
  }

  return (
    <div className="border-t bg-white p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
            disabled={isStreaming}
          />
        </div>
        
        {isStreaming ? (
          <button
            type="button"
            onClick={onStopGeneration}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!message.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Send
          </button>
        )}
      </form>
      
      <div className="text-xs text-gray-500 mt-2 text-center">
        Press Enter to send • Shift+Enter for new line • Esc to stop generation
      </div>
    </div>
  )
}