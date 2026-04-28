"use client"

import { Shield, Sparkles, Handshake, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const fadeUpDelayed = (delay: number) => ({
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
      delay,
    },
  },
})

// Stagger container for list items
const listContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const listItem = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

const sellingPoints = [
  {
    icon: Shield,
    title: "Bảo vệ chủ động",
    description:
      "Hỗ trợ chi phí tầm soát ung thư, giúp phát hiện bệnh từ giai đoạn sớm.",
  },
  {
    icon: Sparkles,
    title: "Cá nhân hóa bằng AI",
    description:
      "Ứng dụng trí tuệ nhân tạo để đánh giá rủi ro và điều chỉnh quyền lợi, phí bảo hiểm phù hợp với từng khách hàng.",
  },
  {
    icon: Handshake,
    title: "Minh bạch, nhanh chóng",
    description: "Quy trình bồi thường tự động, kết nối hệ thống y tế giúp xử lý nhanh và minh bạch.",
  },
]

export function HeroContent() {
  return (
    <div className="max-w-2xl">
      {/* Label */}
      <motion.span
        variants={fadeUpDelayed(0.1)}
        initial="hidden"
        animate="show"
        className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-white/80"
      >
        SẢN PHẨM BẢO HIỂM
      </motion.span>

      {/* Heading */}
      <motion.h1
        variants={fadeUpDelayed(0.2)}
        initial="hidden"
        animate="show"
        className="mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
      >
        Bảo hiểm
        <br />
        ung thư chủ động 
        <br />
        Early Care
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={fadeUpDelayed(0.3)}
        initial="hidden"
        animate="show"
        className="mb-8 text-base text-white/90 sm:text-lg"
      >
        Bảo hiểm Ung thư Chủ động Early Care — thiết kế cho thế hệ chủ động chăm sóc sức khoẻ từ hôm nay, không chờ đến khi quá muộn.
      </motion.p>

      {/* Selling points */}
      <motion.ul
        variants={listContainer}
        initial="hidden"
        animate="show"
        className="mb-8 space-y-4"
        transition={{ delay: 0.4 }}
      >
        {sellingPoints.map((point) => {
          const Icon = point.icon
          return (
            <motion.li
              key={point.title}
              variants={listItem}
              className="flex items-start gap-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                <Icon className="h-4 w-4 text-white" />
              </span>
              <div>
                <p className="whitespace-nowrap font-semibold text-white">{point.title}</p>
                <p className="text-sm text-white/75">{point.description}</p>
              </div>
            </motion.li>
          )
        })}
      </motion.ul>

      {/* CTA buttons */}
      <motion.div
        variants={fadeUpDelayed(0.5)}
        initial="hidden"
        animate="show"
        className="flex flex-wrap items-center gap-4"
      >
        <Button
          variant="consult"
          size="lg"
          className="gap-2 rounded-full px-6 text-sm font-semibold"
          onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
        >
          TÌM HIỂU THÊM
          <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  )
}
