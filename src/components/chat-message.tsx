
import { cn } from "@/lib/utils"
import { Message } from "@/lib/types"
import { User, Bot } from "lucide-react"
import { Card } from "./ui/card"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={cn(
      "flex w-full gap-3 p-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <Card className={cn(
        "flex gap-3 p-4 max-w-[80%]",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-background/10">
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
        <div className="flex-1 space-y-2">
          <div className="font-medium">
            {isUser ? 'You' : 'AI Assistant'}
          </div>
          <div className="text-sm whitespace-pre-wrap">
            {message.content}
          </div>
        </div>
      </Card>
    </div>
  )
}