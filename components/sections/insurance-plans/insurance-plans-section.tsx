"use client"

import { motion } from "framer-motion"
import { plans } from "./data"
import { PlanCard } from "./plan-card"

const easeArr = [0.25, 0.1, 0.25, 1] as const

export function InsurancePlansSection() {
  return (
    <section id="plans" className="relative h-[calc(100vh-65px)] snap-start overflow-x-hidden bg-background py-10 sm:py-12">
      {/* Decorative blurred gradient orbs */}
      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #3B82F6, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-40 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #0C3BAA, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeArr }}
          className="mb-6 text-center"
        >
          <span className="mb-3 inline-block rounded-full bg-[var(--brand-primary)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)]">
            SẢN PHẨM BẢO HIỂM
          </span>
          <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-4xl">
            Chọn gói bảo hiểm phù hợp với bạn
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            3 gói bảo vệ toàn diện, linh hoạt lựa chọn theo nhu cầu và khả năng
            tài chính
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
