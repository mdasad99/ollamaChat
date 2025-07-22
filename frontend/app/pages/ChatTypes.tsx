'use client'

export interface Chat {
  id: string
  title: string
  created_at: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface ChatInterfaceProps {
  initialChats?: Chat[]
  initialChatId?: string | null
}