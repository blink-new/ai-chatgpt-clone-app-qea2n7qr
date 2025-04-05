
import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { SendHorizontal } from "lucide-react"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    onSend(input)
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="min-h-[50px] max-h-[200px]"
        disabled={disabled}
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={disabled || !input.trim()}
        className="shrink-0"
      >
        <SendHorizontal size={20} />
      </Button>
    </form>
  )
}