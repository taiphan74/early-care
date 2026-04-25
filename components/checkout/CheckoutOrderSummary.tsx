"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { CheckCircle2, ChevronLeft, LockKeyhole, ShieldCheck, WalletCards } from "lucide-react"
import { benefits, orderSummary, securityItems } from "@/components/checkout/checkout-data"
import { Button } from "@/components/ui/button"

export function CheckoutOrderSummary() {
  return (
    <aside className="space-y-5">
      <section className="rounded-[32px] border border-[#dce7ff] bg-white p-6 shadow-[0_20px_70px_rgba(12,59,170,0.10)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Thông tin đơn hàng</h2>
            <p className="mt-3 text-sm text-slate-500">{orderSummary.productLabel}</p>
            <h3 className="mt-2 text-2xl font-bold leading-tight text-slate-900">{orderSummary.productName}</h3>
            <div className="mt-3 inline-flex rounded-full bg-[#edf4ff] px-3 py-1 text-xs font-semibold text-[var(--brand-primary)]">
              {orderSummary.packageLabel}
            </div>
          </div>

          <div className="flex size-24 items-center justify-center rounded-[28px] bg-[linear-gradient(135deg,#edf4ff_0%,#ffffff_100%)] text-[var(--brand-primary)] shadow-[inset_0_0_0_1px_rgba(12,59,170,0.08)]">
            <ShieldCheck className="size-11" />
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm">
          <SummaryRow label={orderSummary.coverageAmountLabel} value={orderSummary.coverageAmountValue} />
          <SummaryRow label={orderSummary.premiumLabel} value={orderSummary.premiumValue} />
          <SummaryRow label={orderSummary.termLabel} value={orderSummary.termValue} />
          <SummaryRow label={orderSummary.effectiveDateLabel} value={orderSummary.effectiveDateValue} />
        </div>

        <div className="my-6 h-px bg-[#e5edff]" />

        <div className="text-center">
          <p className="text-sm text-slate-500">{orderSummary.totalLabel}</p>
          <p className="mt-3 text-4xl font-bold tracking-tight text-[var(--brand-primary)]">
            {orderSummary.totalValue}
          </p>
          <p className="mt-2 text-sm text-slate-500">{orderSummary.vatLabel}</p>
        </div>

        <div className="mt-6 rounded-2xl border border-[#d9e4ff] bg-[#f8fbff] p-5">
          <h4 className="text-base font-semibold text-[var(--brand-primary)]">Quyền lợi nổi bật</h4>
          <ul className="mt-4 space-y-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 size-4 text-emerald-500" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-slate-500">
          <SecurityBadge icon={<ShieldCheck className="size-4" />} label={securityItems[0].label} />
          <SecurityBadge icon={<WalletCards className="size-4" />} label={securityItems[1].label} />
          <SecurityBadge icon={<LockKeyhole className="size-4" />} label={securityItems[2].label} />
        </div>
      </section>

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button variant="consult" size="lg" className="h-14 w-full rounded-2xl text-base">
          Xác nhận thanh toán {orderSummary.totalValue}
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button
          variant="outline"
          size="lg"
          className="h-14 w-full rounded-2xl border-[#cfe0ff] bg-white text-base font-semibold text-[var(--brand-primary)]"
        >
          <ChevronLeft className="size-4" />
          Quay lại thông tin
        </Button>
      </motion.div>
    </aside>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  )
}

function SecurityBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-[#e4ecff] bg-white px-3 py-4">
      <span className="flex size-8 items-center justify-center rounded-full bg-[#edf4ff] text-[var(--brand-primary)]">
        {icon}
      </span>
      <span>{label}</span>
    </div>
  )
}
