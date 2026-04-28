"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { addYears, format, subDays } from "date-fns"
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  ChevronRight,
  FileText,
  Gift,
  HeadphonesIcon,
  ScrollText,
  Search,
  ShieldCheck,
  User,
} from "lucide-react"
import { motion } from "framer-motion"
import { StepIndicator } from "@/components/StepIndicator"
import { useApplicationStore } from "@/stores/application-store"

const documents = [
  { label: "Điều khoản loại trừ" },
  { label: "Quy tắc bảo hiểm" },
  { label: "Phụ lục" },
  { label: "Bảng tỉ lệ thương tật" },
  { label: "Bảng tỉ lệ phẫu thuật" },
  { label: "Giấy cam kết bảo hiểm" },
  { label: "Hướng dẫn bồi thường" },
  { label: "Danh sách bệnh viện liên kết" },
]

const benefits = [
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Quyền lợi\nung thư",
    description: "Chi trả theo giai đoạn\nđến giai đoạn trễ",
  },
  {
    icon: <BedDouble className="h-5 w-5" />,
    title: "Trợ cấp\nnằm viện",
    description: "Hỗ trợ chi phí\nđiều trị nội trú",
  },
  {
    icon: <Search className="h-5 w-5" />,
    title: "Tầm soát\nung thư",
    description: "Hỗ trợ chi phí tầm soát\nđịnh kỳ hàng năm",
  },
  {
    icon: <Gift className="h-5 w-5" />,
    title: "Early Detection\nBonus",
    description: "Thưởng khi phát hiện\nở giai đoạn sớm",
  },
  {
    icon: <HeadphonesIcon className="h-5 w-5" />,
    title: "Tư vấn\nsức khỏe",
    description: "Tư vấn bởi đội ngũ\nbác sĩ chuyên môn",
  },
]

function formatDate(dateString: string) {
  if (!dateString) return "—"
  const [year, month, day] = dateString.split("-")
  return `${day}/${month}/${year}`
}

function formatGender(gender: "male" | "female" | undefined) {
  return gender === "male" ? "Nam" : gender === "female" ? "Nữ" : "—"
}

export function ReviewPageClient() {
  const router = useRouter()
  const selectedPlan = useApplicationStore((state) => state.selectedPlan)
  const draft = useApplicationStore((state) => state.applicationDraft)

  useEffect(() => {
    if (!selectedPlan || !draft) {
      router.replace("/application")
    }
  }, [router, selectedPlan, draft])

  if (!selectedPlan || !draft) {
    return null
  }

  const effectiveDate = new Date()
  const expiryDate = subDays(addYears(effectiveDate, 1), 1)

  const handleBack = () => {
    router.push("/application")
  }

  const handleContinue = () => {
    router.push("/checkout")
  }

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[#f5f7fa] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <StepIndicator activeStep={1} />

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0a1f44] sm:text-3xl">
            Thông tin bổ sung
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Vui lòng kiểm tra lại thông tin người được bảo hiểm, thông tin hợp đồng và tài liệu liên quan trước khi tiếp tục.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Left column */}
          <div className="space-y-4">
            {/* Insured person info */}
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
                  <User className="h-4 w-4" />
                </span>
                <h2 className="text-base font-bold text-[var(--brand-primary)]">
                  Người được bảo hiểm
                </h2>
              </div>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <InfoRow label="Họ và tên" value={draft.fullName} />
                <InfoRow label="Email" value={draft.email} />
                <InfoRow label="Ngày sinh" value={formatDate(draft.dateOfBirth)} />
                <InfoRow label="CMND/CCCD/Hộ chiếu" value={draft.identityNumber} />
                <InfoRow label="Giới tính" value={formatGender(draft.gender)} />
                <InfoRow label="Nghề nghiệp" value={draft.occupation} />
                <InfoRow label="Số điện thoại" value={draft.phone} />
              </div>
            </div>

            {/* Contract info */}
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
                  <ScrollText className="h-4 w-4" />
                </span>
                <h2 className="text-base font-bold text-[var(--brand-primary)]">
                  Thông tin hợp đồng
                </h2>
              </div>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <InfoRow label="Gói bảo hiểm" value={selectedPlan.name} valueClass="text-[var(--brand-primary)] font-semibold" />
                <InfoRow label="Thời hạn bảo hiểm" value="12 tháng" />
                <InfoRow label="Sản phẩm" value="Bảo hiểm Ung thư Chủ động Early Care" />
                <InfoRow label="Ngày hiệu lực dự kiến" value={format(effectiveDate, "dd/MM/yyyy")} />
                <InfoRow label="Số tiền bảo hiểm" value={selectedPlan.coverageAmount} />
                <InfoRow label="Ngày hết hạn dự kiến" value={format(expiryDate, "dd/MM/yyyy")} />
                <InfoRow label="Phí bảo hiểm/năm" value={selectedPlan.price} />
                <InfoRow label="Chu kỳ đóng phí" value="Hàng năm" />
                <InfoRow label="Thời gian chờ" value="90 ngày" />
              </div>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <h2 className="text-base font-bold text-[var(--brand-primary)]">
                  Quyền lợi nổi bật
                </h2>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center rounded-xl border border-blue-100 bg-white p-3 text-center"
                  >
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[var(--brand-primary)]">
                      {benefit.icon}
                    </div>
                    <p className="text-xs font-semibold whitespace-pre-line text-slate-900">
                      {benefit.title}
                    </p>
                    <p className="mt-1 text-[10px] whitespace-pre-line text-slate-500">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Documents */}
          <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[var(--brand-primary)]">
                <FileText className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-[var(--brand-primary)]">
                Tài liệu liên quan
              </h2>
            </div>
            <p className="mb-4 text-xs text-slate-500">
              Xem các tài liệu liên quan đến hợp đồng bảo hiểm.
            </p>
            <div className="space-y-2">
              {documents.map((doc) => (
                <button
                  key={doc.label}
                  className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                >
                  <span className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-[var(--brand-primary)]" />
                    {doc.label}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 rounded-2xl border border-blue-100 bg-white/95 p-4 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <motion.button
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleBack}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </motion.button>

            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Thông tin của bạn được bảo mật tuyệt đối.
              </div>
              <p className="text-xs text-slate-500">
                Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn theo quy định của pháp luật.
              </p>
            </div>

            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handleContinue}
              className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20"
            >
              Tiếp tục
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </main>
  )
}

function InfoRow({
  label,
  value,
  valueClass = "font-semibold text-slate-900",
}: {
  label: string
  value: string
  valueClass?: string
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-slate-500">{label}</span>
      <span className={valueClass}>{value || "—"}</span>
    </div>
  )
}
