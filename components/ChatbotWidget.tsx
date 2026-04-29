"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useState } from "react"

export function ChatbotWidget() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) {
    return null
  }

  return (
    <motion.aside
      initial={{ opacity: 0, y: 28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className="fixed bottom-5 right-4 z-50 w-[calc(100vw-2rem)] max-w-[320px] sm:bottom-6 sm:right-6"
      aria-label="Trợ lý CareAI"
    >
      <div className="relative rounded-[28px] border border-white/80 bg-white/92 px-5 pb-5 pt-16 shadow-[0_24px_70px_rgba(12,59,170,0.24)] backdrop-blur-xl">
        <div className="absolute -top-20 left-1/2 h-32 w-32 -translate-x-1/2 overflow-hidden rounded-full">
          <Image
            src="/images/care-ai-chatbot.png"
            alt="CareAI chatbot"
            fill
            sizes="128px"
            className="object-contain drop-shadow-[0_14px_24px_rgba(12,59,170,0.28)]"
            priority
          />
        </div>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute right-5 top-5 rounded-full p-1 text-[var(--brand-primary)] transition hover:bg-blue-50"
          aria-label="Đóng trợ lý CareAI"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="space-y-3 text-[#1E3A5F]">
          <div>
            <h2 className="text-lg font-bold text-[var(--brand-primary)]">Xin chào! Tôi là CareAI</h2>
            <p className="mt-2 text-sm font-medium text-slate-600">Tôi có thể giúp bạn:</p>
          </div>

          <ul className="space-y-1.5 text-sm font-semibold leading-relaxed text-slate-700">
            <li>• Tính phí bảo hiểm cá nhân hóa</li>
            <li>• Giải đáp về sản phẩm Early Care</li>
            <li>• Hướng dẫn kết nối dữ liệu sức khỏe</li>
          </ul>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-2 w-full rounded-2xl bg-[var(--brand-primary)] px-5 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(12,59,170,0.3)] transition hover:bg-[var(--brand-secondary)]"
          >
            Tính phí ngay
          </motion.button>

          <button
            type="button"
            className="w-full rounded-2xl px-5 py-2 text-sm font-bold text-[var(--brand-primary)] transition hover:bg-blue-50"
          >
            Hỏi tôi sau
          </button>
        </div>
      </div>
    </motion.aside>
  )
}
