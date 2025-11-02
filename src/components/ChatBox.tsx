"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export function ChatBox() {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    setMessages([...messages, { text: input, sender: "You" }])
    setInput("")
  }

  return (
    <Card className="p-4 max-w-2xl mx-auto">
      <motion.div
        className="space-y-3 h-80 overflow-y-auto mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-md ${
              msg.sender === "You" ? "bg-primary text-primary-foreground ml-auto w-fit" : "bg-muted"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </motion.div>

      <div className="flex gap-2">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </Card>
  )
}
