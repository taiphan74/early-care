"use client"

import { Shield, Heart, Handshake, ArrowRight, Play } from "lucide-react"
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
      ease: "easeOut",
    },
  },
}

const sellingPoints = [
  {
    icon: Shield,
    title: "Bảo vệ toàn diện",
    description:
      "Chi trả chi phí khám chữa bệnh, nằm viện, phẫu thuật và thậm chí hơn thế nữa.",
  },
  {
    icon: Heart,
    title: "Linh hoạt lựa chọn",
    description:
      "Nhiều gói bảo hiểm phù hợp với nhu cầu và ngân sách của bạn.",
  },
  {
    icon: Handshake,
    title: "Dịch vụ tận tâm",
    description: "Hỗ trợ 24/7, giải quyết nhanh chóng và minh bạch.",
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
        sức khỏe cá nhân
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        variants={fadeUpDelayed(0.3)}
        initial="hidden"
        animate="show"
        className="mb-8 text-base text-white/90 sm:text-lg"
      >
        Chủ động bảo vệ sức khỏe – An tâm tận hưởng cuộc sống
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
                <p className="font-semibold text-white">{point.title}</p>
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
        >
          TÌM HIỂU THÊM
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
        >
          <Play className="h-4 w-4" fill="white" />
          XEM VIDEO GIỚI THIỆU
        </Button>
      </motion.div>
    </div>
  )
}
