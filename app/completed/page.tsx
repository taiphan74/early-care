"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { QRCodeSVG } from "qrcode.react"
import { CheckCircle2, Clock3, Download, FileHeart, Home } from "lucide-react"
import { InsuranceCardMockup } from "@/components/InsuranceCardMockup"
import { StepIndicator } from "@/components/StepIndicator"
import { Button } from "@/components/ui/button"
import { bankTransferDetails, orderSummary } from "@/components/checkout/checkout-data"

const policyDetails = [
  { label: "Mã hợp đồng", value: bankTransferDetails.referenceValue },
  { label: "Người được bảo hiểm", value: "Nguyễn Văn A" },
  { label: "Gói bảo hiểm", value: orderSummary.packageLabel },
  { label: "Ngày hiệu lực", value: orderSummary.effectiveDateValue },
]

export default function CompletedPage() {
  return (
    <main className="min-h-[calc(100vh-65px)] bg-[linear-gradient(180deg,#f5f9ff_0%,#eef4ff_100%)] px-4 py-8 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <StepIndicator activeStep={3} />

        <section className="grid gap-8 rounded-[36px] border border-[#d9e4ff] bg-white p-5 shadow-[0_24px_80px_rgba(12,59,170,0.12)] sm:p-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:p-10">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600"
            >
              <CheckCircle2 className="size-5" />
              Thanh toán QR đã được ghi nhận
            </motion.div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Hoàn tất đăng ký bảo hiểm
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Hợp đồng Early Care của bạn đã được tạo thành công. Mã QR bên cạnh dùng để xác thực nhanh trạng thái hợp đồng và thông tin thanh toán.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {policyDetails.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#e4ecff] bg-[#f8fbff] p-4">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-2 font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl border border-[#d9e4ff] bg-[linear-gradient(135deg,#edf4ff_0%,#ffffff_100%)] p-4 sm:p-6">
              <h2 className="text-lg font-bold text-slate-900">Thẻ bảo hiểm điện tử đã sẵn sàng</h2>
              <div className="mt-5">
                <InsuranceCardMockup />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild variant="consult" size="lg" className="h-14 rounded-2xl px-6 text-base">
                  <Link href="/">
                    <Home className="size-4" />
                    Về trang chủ
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 rounded-2xl border-[#cfe0ff] bg-white px-6 text-base font-semibold text-[var(--brand-primary)]"
                >
                  <Download className="size-4" />
                  Tải chứng nhận
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="lg" className="h-14 rounded-2xl bg-red-600 px-6 text-base font-semibold text-white hover:bg-red-700">
                  <Link href="/claim">
                    <FileHeart className="size-4" />
                    Bồi thường
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>

          <aside className="rounded-[32px] border border-[#d9e4ff] bg-[#fcfdff] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.9)] sm:p-6">
            <div className="rounded-3xl bg-white p-5 shadow-[0_18px_45px_rgba(12,59,170,0.10)]">
              <div className="flex aspect-square items-center justify-center rounded-2xl bg-white p-4">
                <QRCodeSVG
                  value="https://early-care.vercel.app/completed?method=qr&ref=EC241120240001"
                  size={260}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#0f172a"
                  className="h-full w-full"
                />
              </div>
              <p className="mt-4 text-center text-sm font-semibold text-slate-900">QR xác thực hợp đồng</p>
              <p className="mt-1 text-center text-xs text-slate-500">{bankTransferDetails.referenceValue}</p>
            </div>

            <div className="mt-5 rounded-3xl border border-[#e4ecff] bg-white p-5">
              <p className="text-sm text-slate-500">Tổng đã thanh toán</p>
              <p className="mt-2 text-3xl font-bold text-[var(--brand-primary)]">{orderSummary.totalValue}</p>
              <div className="mt-5 flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-600">
                <Clock3 className="size-4" />
                Xác nhận tức thì
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}
