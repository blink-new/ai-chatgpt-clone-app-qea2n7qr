
import { useEffect, useRef, useState } from "react"
import { ChatMessage } from "./components/chat-message"
import { ChatInput } from "./components/chat-input"
import { Message, ChatState } from "./lib/types"
import { ScrollArea } from "./components/ui/scroll-area"
import { Button } from "./components/ui/button"
import { Trash2 } from "lucide-react"

// Mock AI response - we'll replace this with real API later
const mockAIResponse = async (message: string) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return `I am a mock AI assistant. You said: "${message}"`
}

function App() {
  const [chatState, setChatState] = useState<ChatState>(() => {
    const saved = localStorage.getItem('chat-state')
    return saved ? JSON.parse(saved) : {
      messages: [],
      isLoading: false
    }
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    localStorage.setItem('chat-state', JSON.stringify(chatState))
  }, [chatState])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatState.messages])

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now()
    }

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }))

    try {
      const aiResponse = await mockAIResponse(content)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now()
      }

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false
      }))
    } catch (error) {
      console.error('Failed to get AI response:', error)
      setChatState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const clearChat = () => {
    setChatState({ messages: [], isLoading: false })
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">AI Chat</h1>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={clearChat}
          disabled={chatState.messages.length === 0}
        >
          <Trash2 size={20} />
        </Button>
      </header>

      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {chatState.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {chatState.isLoading && (
            <div className="flex items-center justify-center p-4 text-muted-foreground">
              AI is thinking...
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t max-w-3xl w-full mx-auto">
        <ChatInput 
          onSend={handleSend} 
          disabled={chatState.isLoading} 
        />
      </div>
    </div>
  )
}

export default App