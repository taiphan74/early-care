"use client"

import { cn } from "@/lib/utils"

type StepIndicatorProps = {
  activeStep: number
}

const steps = [
  "Thông tin & Khai báo",
  "Thông tin bổ sung",
  "Xem lại & Thanh toán",
  "Hoàn tất",
]

export function StepIndicator({ activeStep }: StepIndicatorProps) {
  return (
    <div className="mb-8 overflow-x-auto pb-2">
      <div className="mx-auto flex min-w-[720px] max-w-4xl items-center justify-between gap-4">
        {steps.map((step, index) => {
          const active = index === activeStep
          return (
            <div key={step} className="flex flex-1 items-center gap-4 last:flex-none">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold",
                    active
                      ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-white shadow-lg shadow-blue-700/20"
                      : "border-blue-100 bg-white text-slate-500"
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "max-w-28 text-sm font-semibold",
                    active ? "text-[var(--brand-primary)]" : "text-slate-500"
                  )}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-px flex-1",
                    active ? "bg-[var(--brand-primary)]" : "bg-blue-100"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
