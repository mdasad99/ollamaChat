'use client'

interface Chat {
  id: string
  title: string
  created_at: string
}

interface ChatSidebarProps {
  chats: Chat[]
  currentChatId: string | null
  onChatSelect: (chatId: string) => void
  onNewChat: () => void
}

export default function ChatSidebar({ chats, currentChatId, onChatSelect, onNewChat }: ChatSidebarProps) {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          + New Chat
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pb-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Recent Chats</h3>
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                currentChatId === chat.id
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <div className="truncate text-sm">{chat.title}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(chat.created_at).toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}