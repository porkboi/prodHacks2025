"use client"

import type React from "react"

import { useState } from "react"
import { NavBar } from "@/components/nav-bar"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import axios from 'axios'

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AnalysisPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I can help you analyze stocks. Just enter a stock symbol or company name to get started.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      // In a real application, you would call your AI endpoint here
      const response =
      await axios.post('http://localhost:5000/generate', {
        prompt: userMessage + "keep it short",
      });

      console.log(userMessage)

      console.log(response.data.response)

      setMessages((prev) => [...prev, { role: "assistant", content: response.data.response }])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error while analyzing that stock. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <NavBar />
      <div className="container max-w-2xl px-4 py-8">
        <Card className="h-[600px] flex flex-col">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">Stock Analysis Bot</h1>
            <p className="text-sm text-muted-foreground">Ask me about any stock for detailed analysis</p>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div key={i} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 bg-muted">Analyzing...</div>
                </div>
              )}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
            <Input
              placeholder="Enter a stock symbol or company name..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </main>
  )
}

