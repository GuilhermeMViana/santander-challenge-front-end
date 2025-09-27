import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Image from "next/image"
import santanderLogo from "../../../public/santander_logo.png"

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
      <Button
        className="fixed bottom-6 right-6 z-50 bg-[#ec0000] hover:bg-[#b80000] text-white font-bold shadow-lg animate-bounce"
        onClick={() => setOpen(true)}
        style={{ borderRadius: 40, padding: "0.75rem 1.5rem" }}
      >
        <span className="flex items-center gap-2">
          <Image src={santanderLogo} alt="Santander" width={24} height={24} />
          Falar com o Chatbot
        </span>
      </Button>
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white border-2 border-[#ec0000] shadow-2xl rounded-2xl p-4 z-50 flex flex-col animate-fade-in">
          <div className="flex justify-between items-center mb-2 pb-2 border-b border-[#ec0000]">
            <span className="flex items-center gap-2 font-bold text-[#ec0000] text-lg">
              <Image src={santanderLogo} alt="Santander" width={28} height={28} />
              Santander Chatbot
            </span>
            <Button size="sm" variant="default" onClick={() => setOpen(false)} className="bg-[#ec0000] text-white hover:bg-[#b80000] rounded-full px-3 py-1">
              X
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto mb-2 max-h-64 scrollbar-thin scrollbar-thumb-[#ec0000]/60 scrollbar-track-gray-100">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 text-sm flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <span
                  className={
                    msg.role === "user"
                      ? "bg-[#ec0000] text-white px-3 py-2 rounded-2xl max-w-[70%] shadow-md"
                      : "bg-gray-100 text-[#ec0000] px-3 py-2 rounded-2xl max-w-[70%] shadow"
                  }
                >
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              disabled={loading}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              className="border-[#ec0000] focus:border-[#b80000] rounded-2xl"
            />
            <Button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-[#ec0000] text-white hover:bg-[#b80000] rounded-2xl font-bold px-4"
            >
              Enviar
            </Button>
          </div>
        </div>
      )}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-[#ec0000]/60::-webkit-scrollbar-thumb {
          background: #ec000099;
        }
        .scrollbar-track-gray-100::-webkit-scrollbar-track {
          background: #f3f4f6;
        }
      `}</style>
    </>
  )
}
