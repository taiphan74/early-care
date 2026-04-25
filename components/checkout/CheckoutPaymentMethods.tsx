"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Globe,
  Lock,
  MapPin,
  QrCode,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react"
import {
  bankApps,
  bankTransferDetails,
  orderSummary,
  paymentMethods,
  type PaymentApp,
  type PaymentMethodKey,
  walletApps,
} from "@/components/checkout/checkout-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CheckoutPaymentMethodsProps = {
  activeMethod: PaymentMethodKey
  onMethodChange: (method: PaymentMethodKey) => void
}

const methodIcons = {
  qr: QrCode,
  card: CreditCard,
  wallet: Wallet,
} as const

export function CheckoutPaymentMethods({
  activeMethod,
  onMethodChange,
}: CheckoutPaymentMethodsProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-[#d9e4ff] bg-white p-6 shadow-[0_18px_60px_rgba(12,59,170,0.08)]">
        <h2 className="text-lg font-semibold text-slate-900">1. Chọn phương thức thanh toán</h2>

        <div className="mt-5 grid grid-cols-3 overflow-hidden rounded-2xl border border-[#d9e4ff] bg-[#f8fbff]">
          {paymentMethods.map((method) => {
            const Icon = methodIcons[method.key]
            const isActive = method.key === activeMethod

            return (
              <button
                key={method.key}
                type="button"
                onClick={() => onMethodChange(method.key)}
                className={cn(
                  "flex items-center justify-center gap-2 border-r border-[#d9e4ff] px-4 py-4 text-sm font-semibold transition-colors last:border-r-0",
                  isActive
                    ? "bg-white text-[var(--brand-primary)] shadow-[inset_0_0_0_1px_rgba(12,59,170,0.25)]"
                    : "text-slate-700 hover:bg-white/70"
                )}
              >
                <Icon className="size-4" />
                <span>{method.label}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-[#e4ecff] bg-[#fcfdff] p-5">
          {activeMethod === "qr" && <QrMethodContent />}
          {activeMethod === "card" && <CardMethodContent />}
          {activeMethod === "wallet" && <WalletMethodContent />}
        </div>
      </section>

    </div>
  )
}

function QrMethodContent() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-slate-900">Thanh toán bằng mã QR (VietQR)</h3>
        <p className="mt-1 text-sm text-slate-500">
          Quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử để thanh toán.
        </p>
      </div>

      <div className="grid grid-cols-[240px_1fr] gap-5">
        <div className="rounded-2xl border border-[#d9e4ff] bg-white p-4">
          <div className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-[#b8cbff] bg-[linear-gradient(135deg,#ffffff_0%,#edf4ff_100%)]">
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: 36 }).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    "size-4 rounded-[2px]",
                    index % 3 === 0 || index % 5 === 0 ? "bg-slate-900" : "bg-slate-200"
                  )}
                />
              ))}
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">Quét mã bằng ứng dụng ngân hàng</p>
        </div>

        <div className="rounded-2xl border border-[#d9e4ff] bg-white p-4">
          <div className="grid grid-cols-[180px_1fr] gap-y-3 text-sm">
            <span className="text-slate-500">{bankTransferDetails.bankNameLabel}</span>
            <span className="font-medium text-slate-900">{bankTransferDetails.bankNameValue}</span>

            <span className="text-slate-500">{bankTransferDetails.accountNumberLabel}</span>
            <span className="font-medium text-slate-900">{bankTransferDetails.accountNumberValue}</span>

            <span className="text-slate-500">{bankTransferDetails.accountHolderLabel}</span>
            <span className="font-medium text-slate-900">{bankTransferDetails.accountHolderValue}</span>

            <span className="text-slate-500">{bankTransferDetails.amountLabel}</span>
            <span className="text-lg font-bold text-[var(--brand-primary)]">{bankTransferDetails.amountValue}</span>

            <span className="text-slate-500">{bankTransferDetails.referenceLabel}</span>
            <span className="font-medium text-slate-900">{bankTransferDetails.referenceValue}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-[#e7efff] pt-5">
        <div>
          <p className="text-sm font-medium text-slate-900">Quét mã bằng ứng dụng ngân hàng</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {bankApps.map((app) => (
              <AppChip key={app.id} {...app} />
            ))}
            <button type="button" className="text-sm font-medium text-[var(--brand-primary)]">
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CardMethodContent() {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Thông tin thẻ</h3>
          <p className="mt-1 text-sm text-slate-500">Vui lòng nhập thông tin thẻ để hoàn tất thanh toán</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex h-5 items-center rounded bg-white px-1 text-xs font-bold italic text-[#1A1F71] shadow-sm">
            VISA
          </span>
          <span className="inline-flex h-5 items-center rounded bg-white px-1 text-xs font-bold italic text-[#EB001B] shadow-sm">
            MC
          </span>
          <span className="inline-flex h-5 items-center rounded bg-white px-1 text-xs font-bold text-[#006FCF] shadow-sm">
            amex
          </span>
          <span className="inline-flex h-5 items-center rounded bg-white px-1 text-xs font-bold text-[#0066B3] shadow-sm">
            JCB
          </span>
          <span className="inline-flex h-5 items-center rounded bg-white px-1 text-[10px] font-bold text-[#00A4E0] shadow-sm">
            NAPAS
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-900">Số thẻ</label>
          <div className="relative">
            <CreditCard className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              inputMode="numeric"
              maxLength={19}
              placeholder="1234 1234 1234 1234"
              className="h-11 w-full rounded-xl border border-[#d9e4ff] bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(12,59,170,0.1)]"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-900">Tên chủ thẻ</label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="NGUYEN VAN A"
              className="h-11 w-full rounded-xl border border-[#d9e4ff] bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(12,59,170,0.1)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Ngày hết hạn</label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                inputMode="numeric"
                maxLength={5}
                placeholder="MM / YY"
                className="h-11 w-full rounded-xl border border-[#d9e4ff] bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(12,59,170,0.1)]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-900">Mã bảo mật (CVV)</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="123"
                className="h-11 w-full rounded-xl border border-[#d9e4ff] bg-white pl-10 pr-8 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(12,59,170,0.1)]"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                title="Mã CVV/CVC gồm 3-4 chữ số ở mặt sau thẻ"
              >
                <span className="flex size-4 items-center justify-center rounded-full border border-slate-300 text-[10px] font-bold">
                  i
                </span>
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-900">Quốc gia / Khu vực</label>
          <div className="relative">
            <Globe className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <select className="h-11 w-full appearance-none rounded-xl border border-[#d9e4ff] bg-white pl-10 pr-10 text-sm text-slate-900 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(12,59,170,0.1)]">
              <option>Việt Nam</option>
              <option>Singapore</option>
              <option>Hoa Kỳ</option>
              <option>Anh</option>
              <option>Đức</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-900">
            Địa chỉ thanh toán (tùy chọn)
          </label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Nhập địa chỉ thanh toán"
              className="h-11 w-full rounded-xl border border-[#d9e4ff] bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[rgba(12,59,170,0.1)]"
            />
          </div>
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button
          variant="consult"
          size="lg"
          className="h-14 w-full rounded-2xl text-base"
        >
          <span className="flex w-full items-center justify-between">
            <span className="flex items-center gap-2">
              <Lock className="size-4" />
              Thanh toán ngay
            </span>
            <span className="flex items-center gap-1">
              {orderSummary.totalValue}
              <ChevronRight className="size-4" />
            </span>
          </span>
        </Button>
      </motion.div>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="size-4 text-emerald-500" />
        <span>Thông tin thẻ của bạn được mã hóa và bảo mật theo tiêu chuẩn PCI DSS.</span>
      </div>
    </div>
  )
}

function WalletMethodContent() {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-semibold text-slate-900">Ví điện tử</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {walletApps.map((app) => {
          const isSelected = app.id === selectedWallet
          return (
            <button
              key={app.id}
              type="button"
              onClick={() => setSelectedWallet(app.id)}
              className={cn(
                "relative flex flex-col items-center gap-2 rounded-2xl border bg-white px-4 py-5 transition-all",
                isSelected
                  ? "border-[var(--brand-primary)] shadow-[0_0_0_2px_rgba(12,59,170,0.15)]"
                  : "border-[#d9e4ff] hover:bg-[#f8fbff]"
              )}
            >
              {isSelected && (
                <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-[var(--brand-primary)] text-white">
                  <svg className="size-3" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L5.5 10.5L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
              {app.logo ? (
                <img
                  src={app.logo}
                  alt={app.label}
                  className="size-12 object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="flex size-12 items-center justify-center rounded-xl bg-[#edf4ff] text-sm font-bold text-[var(--brand-primary)]">
                  {app.shortLabel}
                </span>
              )}
              <span className="text-sm font-medium text-slate-800">{app.label}</span>
            </button>
          )
        })}
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-[#d9e4ff] bg-[#f8fbff] p-4">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]" />
        <div>
          <p className="text-sm font-semibold text-slate-900">Thanh toán an toàn &amp; bảo mật</p>
          <p className="mt-1 text-xs text-slate-500">
            Chúng tôi bảo vệ thông tin của bạn theo tiêu chuẩn bảo mật quốc tế.
          </p>
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button
          variant="consult"
          size="lg"
          className="h-14 w-full rounded-2xl text-base"
          disabled={!selectedWallet}
        >
          <span className="flex w-full items-center justify-between">
            <span className="mx-auto">Tiếp tục thanh toán</span>
            <ChevronRight className="size-5" />
          </span>
        </Button>
      </motion.div>
    </div>
  )
}

function AppChip({ label, shortLabel, logo }: PaymentApp) {
  return (
    <div className="flex min-w-32 items-center gap-3 rounded-2xl border border-[#d9e4ff] bg-white px-4 py-3">
      {logo ? (
        <img
          src={logo}
          alt={label}
          className="size-9 rounded-xl object-contain"
          loading="lazy"
        />
      ) : (
        <span className="flex size-9 items-center justify-center rounded-xl bg-[#edf4ff] text-xs font-bold text-[var(--brand-primary)]">
          {shortLabel}
        </span>
      )}
      <span className="text-sm font-medium text-slate-800">{label}</span>
    </div>
  )
}
