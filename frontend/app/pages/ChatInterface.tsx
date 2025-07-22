'use client'

import { ChatInterfaceProps } from './ChatTypes'
import { useChatLogic } from './ChatHooks'

export default function ChatInterface({ 
  initialChats = [], 
  initialChatId = null 
}: ChatInterfaceProps) {
  const {
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
  } = useChatLogic(initialChats, initialChatId)

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50 max-w-6xl mx-auto border rounded-lg overflow-hidden shadow-lg">
      <div className="w-64 bg-white border-r text-black flex flex-col">
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            New Chat
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pb-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">ChatGPT-style App</h3>
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setCurrentChatId(chat.id)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                  currentChatId === chat.id
                    ? 'bg-gray-200 text-black'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="truncate text-sm">{chat.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatDate(chat.created_at)}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        {currentChatId ? (
          <>
            <div className="border-b p-4">
              <h2 className="text-xl font-bold">{activeChat?.title || 'Marketing plan'}</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8" id="messages-container">
              {messages.map((message) => (
                <div key={message.id} className="max-w-3xl mx-auto">
                  <div className="font-semibold mb-2">
                    {message.role === 'user' ? 'User:' : 'Bot:'}
                  </div>
                  <div className="whitespace-pre-wrap">
                    {message.content}
                    {message.role === 'assistant' && messages[messages.length - 1].id === message.id && !isStreaming && (
                      <span className="inline-block ml-1">😊</span>
                    )}
                    {message.role === 'assistant' && messages[messages.length - 1].id === message.id && isStreaming && (
                      <span className="inline-block ml-1 animate-pulse">▌</span>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && messages.length === 0 && (
                <div className="max-w-3xl mx-auto">
                  <div className="font-semibold mb-2">Bot:</div>
                  <div className="flex items-center space-x-2">
                    <div className="animate-pulse">Thinking...</div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
              {messages.length > 2 && (
                <div className="fixed bottom-24 right-8">
                  <button 
                    onClick={scrollToBottom}
                    className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none"
                    aria-label="Scroll to bottom"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            <div className="border-t p-4">
              <form onSubmit={handleSendMessage} className="flex items-center max-w-3xl mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (inputMessage.trim() && !isStreaming) {
                          handleSendMessage(e);
                        }
                      }
                      if (e.key === 'Escape' && isStreaming) {
                        stopGeneration();
                      }
                    }}
                    placeholder="Type your message..."
                    className="w-full p-3 pr-20 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    disabled={isStreaming}
                  />
                  {isStreaming ? (
                    <button
                      type="button"
                      onClick={stopGeneration}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg"
                    >
                      Stop
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!inputMessage.trim() || isStreaming}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-1.5 rounded-lg"
                    >
                      Send
                    </button>
                  )}
                </div>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <h2 className="text-2xl font-semibold mb-2">Local ChatGPT-style chat</h2>
              <p>Select a chat or create a new one to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}