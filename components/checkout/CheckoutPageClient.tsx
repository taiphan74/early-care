"use client"

import { useEffect, useMemo, useState } from "react"
import { Lock, TimerReset, User } from "lucide-react"
import { StepIndicator } from "@/components/StepIndicator"
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
    <main className="min-h-[calc(100vh-65px)] bg-[linear-gradient(180deg,#f5f9ff_0%,#eef4ff_100%)] px-4 py-8 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-[1280px]">
        <StepIndicator activeStep={2} />

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_380px]">
          <div className="min-w-0">
              <header>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Thanh toán</h1>
                <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                  <Lock className="size-4" />
                  <span>Thông tin của bạn được bảo mật tuyệt đối</span>
                </div>
              </header>

              <section className="mt-6 rounded-[28px] border border-[#d9e4ff] bg-white p-6 shadow-[0_18px_60px_rgba(12,59,170,0.08)]">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
                    <User className="h-4 w-4" />
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">Thông tin người được bảo hiểm (NĐBH)</h2>
                </div>
                <div className="grid gap-3 text-sm md:grid-cols-2">
                  <div className="flex justify-between rounded-xl bg-[#f8fbff] px-4 py-3">
                    <span className="text-slate-500">Họ và tên</span>
                    <span className="font-semibold text-slate-900">Nguyễn Văn A</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-[#f8fbff] px-4 py-3">
                    <span className="text-slate-500">Ngày sinh</span>
                    <span className="font-semibold text-slate-900">15/03/1985</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-[#f8fbff] px-4 py-3">
                    <span className="text-slate-500">Giới tính</span>
                    <span className="font-semibold text-slate-900">Nam</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-[#f8fbff] px-4 py-3">
                    <span className="text-slate-500">Số điện thoại</span>
                    <span className="font-semibold text-slate-900">0901 234 567</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-[#f8fbff] px-4 py-3">
                    <span className="text-slate-500">CMND/CCCD</span>
                    <span className="font-semibold text-slate-900">079085123456</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-[#f8fbff] px-4 py-3">
                    <span className="text-slate-500">Nghề nghiệp</span>
                    <span className="font-semibold text-slate-900">Nhân viên văn phòng</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-[#f8fbff] px-4 py-3">
                    <span className="text-slate-500">Email</span>
                    <span className="font-semibold text-slate-900">nguyenvana@email.com</span>
                  </div>
                  <div className="flex justify-between rounded-xl bg-[#f8fbff] px-4 py-3">
                    <span className="text-slate-500">Nơi cấp CMND/CCCD</span>
                    <span className="font-semibold text-slate-900">TP.HCM</span>
                  </div>
                </div>
              </section>

              <section className="mt-6 flex flex-col gap-4 rounded-[24px] border border-[#dbe6ff] bg-white px-5 py-5 shadow-[0_12px_35px_rgba(12,59,170,0.08)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
