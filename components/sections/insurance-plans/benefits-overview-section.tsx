"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, HeartPulse } from "lucide-react"

const easeArr = [0.25, 0.1, 0.25, 1] as const

const highlights = [
  "01 THỰC TRẠNG UNG THƯ",
  "02 XU HƯỚNG THẾ HỆ TRẺ (GEN Z)",
  "03 EARLY CARE – GIẢI PHÁP BẢO HIỂM CHỦ ĐỘNG",
]

export function BenefitsOverviewSection() {
  return (
    <section className="relative h-[calc(100vh-65px)] snap-start overflow-hidden bg-gradient-to-br from-white via-blue-50/60 to-white py-10">
      <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[var(--brand-primary)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[var(--brand-secondary)]/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid h-full max-w-[1440px] items-center gap-8 px-4 sm:px-6 lg:grid-cols-[0.55fr_1.45fr] lg:px-10 xl:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeArr }}
          className="max-w-[420px] space-y-4"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)]/10 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
            <HeartPulse className="h-4 w-4" />
            Chăm sóc chủ động
          </span>

          <div className="space-y-4">
            <h2 className="max-w-xl text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-[2.35rem]">
              VÌ SAO EARLY CARE RA ĐỜI?
            </h2>
            <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Từ thực trạng ung thư – xu hướng thế hệ trẻ – đến giải pháp bảo hiểm chủ động
            </p>
          </div>

          <div className="space-y-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-blue-100">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-primary)]" />
                <p className="text-sm leading-6 text-foreground sm:text-base">{item}</p>
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-blue-900/20"
          >
            TƯ VẤN NGAY
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeArr, delay: 0.15 }}
          className="relative mx-auto w-full max-w-[980px] lg:-mr-12 xl:-mr-20"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-[var(--brand-primary)]/20 to-[var(--brand-secondary)]/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-3 shadow-2xl shadow-blue-950/15 ring-1 ring-blue-100">
            <Image
              src="/images/early-care-benefits-overview.png"
              alt="Gia đình an tâm với quyền lợi bảo hiểm Early Care"
              width={980}
              height={760}
              className="h-auto w-full rounded-[1.5rem] object-cover"
              priority={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
