"use client"

import { useEffect, useMemo, useState } from "react"
import { Lock, TimerReset } from "lucide-react"
import { CheckoutOrderSummary } from "@/components/checkout/CheckoutOrderSummary"
import { CheckoutPaymentMethods } from "@/components/checkout/CheckoutPaymentMethods"
import { CheckoutSecurityFooter } from "@/components/checkout/CheckoutSecurityFooter"
import {
  paymentNotice,
  type PaymentMethodKey,
} from "@/components/checkout/checkout-data"

const INITIAL_SECONDS = 15 * 60

function formatCountdown(totalSeconds: number) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0")
  const seconds = String(totalSeconds % 60).padStart(2, "0")

  return `${minutes}:${seconds}`
}

export function CheckoutPageClient() {
  const [activeMethod, setActiveMethod] = useState<PaymentMethodKey>("qr")
  const [remainingSeconds, setRemainingSeconds] = useState(INITIAL_SECONDS)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRemainingSeconds((current) => {
        if (current <= 0) {
          window.clearInterval(intervalId)
          return 0
        }

        return current - 1
      })
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  const countdownLabel = useMemo(() => formatCountdown(remainingSeconds), [remainingSeconds])

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5f9ff_0%,#eef4ff_100%)] px-6 py-10">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-[minmax(0,1.35fr)_380px] gap-8">
          <div>
            <header>
              <h1 className="text-5xl font-bold tracking-tight text-slate-900">Thanh toán</h1>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <Lock className="size-4" />
                <span>Thông tin của bạn được bảo mật tuyệt đối</span>
              </div>
            </header>

            <section className="mt-6 flex items-center justify-between rounded-[24px] border border-[#dbe6ff] bg-white px-6 py-5 shadow-[0_12px_35px_rgba(12,59,170,0.08)]">
              <div className="flex items-start gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#edf4ff] text-[var(--brand-primary)]">
                  <TimerReset className="size-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[var(--brand-primary)]">{paymentNotice.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">{paymentNotice.description}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#dbe6ff] bg-[#f8fbff] px-5 py-3 text-lg font-bold text-[var(--brand-primary)]">
                {countdownLabel}
              </div>
            </section>

            <div className="mt-6">
              <CheckoutPaymentMethods
                activeMethod={activeMethod}
                onMethodChange={setActiveMethod}
              />
            </div>

            <CheckoutSecurityFooter />
          </div>

          <CheckoutOrderSummary />
        </div>
      </div>
    </main>
  )
}
