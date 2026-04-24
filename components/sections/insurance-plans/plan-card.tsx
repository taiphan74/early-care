"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { Plan } from "./data"
import {
  ShieldCheck,
  BedDouble,
  Search,
  Heart,
  Gift,
  Plus,
} from "lucide-react"

const iconMap = {
  shield: ShieldCheck,
  bed: BedDouble,
  search: Search,
  heart: Heart,
  gift: Gift,
  plus: Plus,
}

const easeArr = [0.25, 0.1, 0.25, 1] as const

export function PlanCard({
  plan,
  index,
}: {
  plan: Plan
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        ease: easeArr,
        delay: index * 0.15,
      }}
      className={cn(
        "relative flex flex-col rounded-2xl border bg-white p-5 transition-shadow duration-300 hover:shadow-lg lg:p-6",
        plan.highlighted
          ? "border-[var(--brand-primary)] shadow-xl ring-1 ring-[var(--brand-primary)]/10"
          : "border-border shadow-sm"
      )}
    >
      {/* Popular badge */}
      {"badge" in plan && plan.badge && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-lg bg-[var(--brand-primary)] px-4 py-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-white">
            {plan.badge}
          </span>
        </div>
      )}

      {/* Header: icon + name */}
      <div className="mb-3 flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            plan.highlighted
              ? "bg-[var(--brand-primary)] text-white"
              : "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]"
          )}
        >
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
          <p className="text-xs text-muted-foreground">{plan.tagline}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mb-3 h-px bg-border" />

      {/* Coverage amount */}
      <div className="mb-2 text-center">
        <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          SỐ TIỀN BẢO HIỂM
        </p>
        <p className="text-xl font-extrabold text-[var(--brand-primary)]">
          {plan.coverageAmount}
        </p>
      </div>

      {/* Price box */}
      <div
        className={cn(
          "mb-3 rounded-xl border p-3 text-center",
          plan.highlighted
            ? "border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/5"
            : "border-border bg-muted/50"
        )}
      >
        <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          PHÍ BẢO HIỂM/NĂM
        </p>
        <p className="text-lg font-bold text-[var(--brand-primary)]">
          {plan.price}
          <span className="text-xs font-semibold text-muted-foreground">
            {plan.pricePeriod}
          </span>
        </p>
      </div>

      {/* Feature list */}
      <ul className="mb-4 flex-1 space-y-2">
        {plan.features.map((feature) => {
          const Icon = iconMap[feature.icon]
          return (
            <li key={feature.label} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)]/10">
                <Icon className="h-3 w-3 text-[var(--brand-primary)]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {feature.label}
                </p>
                <p className="text-sm text-muted-foreground">{feature.value}</p>
              </div>
            </li>
          )
        })}
      </ul>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={cn(
          "w-full cursor-pointer rounded-xl py-2.5 text-sm font-semibold transition-colors",
          plan.highlighted
            ? "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary)]/90"
            : "border border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/5"
        )}
      >
        {plan.cta}
      </motion.button>
    </motion.div>
  )
}
