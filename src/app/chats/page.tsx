"use client"

import { useEffect, useState, useRef } from "react"
import { Client, Account } from "appwrite"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "sonner"

export default function ChatsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ id: number; text: string; sender: string }[]>([])
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Appwrite setup
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string)
  const account = new Account(client)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await account.get()
        setUser(res)
      } catch (err) {
        toast.error("Login required")
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!message.trim()) return
    setMessages((prev) => [...prev, { id: Date.now(), text: message, sender: user?.name || "You" }])
    setMessage("")
    toast.success("Message sent!") // You’ll later replace this with Appwrite Realtime send
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Loading chats...
      </div>
    )

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-700 bg-slate-900/70 backdrop-blur-xl p-4 hidden md:flex flex-col">
        <h2 className="text-lg font-semibold mb-4">Recent Chats</h2>
        <div className="space-y-3 overflow-y-auto flex-1">
          {["General", "Tech Talk", "Ideas", "Friends"].map((chat, i) => (
            <Card
              key={i}
              className="bg-slate-800/50 border border-slate-700 hover:bg-slate-800 cursor-pointer p-3 transition-all"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/identicon/svg?seed=${chat}`} />
                  <AvatarFallback>{chat[0]}</AvatarFallback>
                </Avatar>
                <p className="text-sm">{chat}</p>
              </div>
            </Card>
          ))}
        </div>
        <Button
          variant="outline"
          className="border-slate-600 mt-6 text-slate-300 hover:bg-slate-800"
          onClick={() => toast.info("New chat feature coming soon!")}
        >
          + New Chat
        </Button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-900/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-slate-700">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`}
                alt="User"
              />
              <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-medium">{user?.name || "User"}</h1>
              <p className="text-slate-400 text-xs">Online</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/profile")}
            className="border-slate-600 text-slate-300 hover:bg-slate-800"
          >
            Profile
          </Button>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-6 space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-slate-400 mt-20">Start chatting 👋</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === user?.name ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                    msg.sender === user?.name
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-slate-800/70 text-slate-100 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Input Bar */}
        <div className="border-t border-slate-700 p-4 flex gap-3 bg-slate-900/60 backdrop-blur-xl">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 bg-slate-800/50 border-slate-700 text-white"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button
            onClick={handleSend}
            className="bg-indigo-600 hover:bg-indigo-500 transition-all"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
