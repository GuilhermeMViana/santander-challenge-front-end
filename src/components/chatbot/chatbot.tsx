import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

const CHAT_API_URL = "http://localhost:5000/api/chat"

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    setMessages((msgs) => [...msgs, { role: "user", content: input }])
    setLoading(true)
    try {
      const res = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pergunta: input })
      })
      const data = await res.json()
      setMessages((msgs) => [...msgs, { role: "bot", content: data.resposta }])
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: "bot", content: "Erro ao conectar ao chat." }])
    }
    setInput("")
    setLoading(false)
  }

  return (
    <>
      <Button className="fixed bottom-6 right-6 z-50" onClick={() => setOpen(true)}>
        Falar com o Chatbot
      </Button>
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-lg rounded-lg p-4 z-50 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold">Chatbot</span>
            <Button size="sm" variant="default" onClick={() => setOpen(false)}>X</Button>
          </div>
          <div className="flex-1 overflow-y-auto mb-2 max-h-64">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 text-sm ${msg.role === "user" ? "text-right" : "text-left"}`}>
                <span className={msg.role === "user" ? "bg-primary text-white px-2 py-1 rounded" : "bg-gray-100 px-2 py-1 rounded"}>
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              disabled={loading}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
            />
            <Button onClick={sendMessage} disabled={loading || !input.trim()}>
              Enviar
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
