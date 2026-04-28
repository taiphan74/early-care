"use client"

import { type ChangeEvent, type FormEvent, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Building2, CheckCircle2, Clock3, FileText, Home, Hospital, Trash2, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatFileSize, validateClaimForm, type ClaimFormErrors } from "./claim-form"

type BankField = "bankName" | "accountNumber" | "accountHolder"

const bankFieldLabels: Record<BankField, string> = {
  bankName: "Ngân hàng",
  accountNumber: "Số tài khoản/Số thẻ",
  accountHolder: "Chủ tài khoản",
}

const bankFieldPlaceholders: Record<BankField, string> = {
  bankName: "Ví dụ: Vietcombank",
  accountNumber: "Nhập số tài khoản hoặc số thẻ",
  accountHolder: "Nhập đúng tên chủ tài khoản",
}

const partnerHospitals = [
  "Bệnh viện Đại học Y Dược TP.HCM",
  "Bệnh viện Chợ Rẫy",
  "Bệnh viện Nhân dân 115",
  "Bệnh viện FV (Franco-Vietnamien)",
  "Bệnh viện Tim TP.HCM",
  "Bệnh viện Nhi Trung ương",
  "Bệnh viện Bạch Mai",
  "Bệnh viện Việt Đức",
  "Bệnh viện Đại học Y Hà Nội",
  "Bệnh viện Phổi Trung ương",
]

export function ClaimPageClient() {
  const [files, setFiles] = useState<File[]>([])
  const [bankFields, setBankFields] = useState<Record<BankField, string>>({
    bankName: "Vietcombank",
    accountNumber: "0123456789",
    accountHolder: "Nguyễn Văn A",
  })
  const [errors, setErrors] = useState<ClaimFormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [isPartnerHospital, setIsPartnerHospital] = useState(false)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? [])

    if (selectedFiles.length > 0) {
      setFiles((currentFiles) => [...currentFiles, ...selectedFiles])
      setSubmitted(false)
    }

    event.target.value = ""
  }

  function removeFile(indexToRemove: number) {
    setFiles((currentFiles) => currentFiles.filter((_, index) => index !== indexToRemove))
    setSubmitted(false)
  }

  function updateBankField(field: BankField, value: string) {
    setBankFields((currentFields) => ({ ...currentFields, [field]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }))
    setSubmitted(false)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = validateClaimForm({
      bankName: bankFields.bankName,
      accountNumber: bankFields.accountNumber,
      accountHolder: bankFields.accountHolder,
    })

    setErrors(result.errors)

    if (result.valid) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <main className="min-h-[calc(100vh-65px)] bg-[linear-gradient(180deg,#f5f9ff_0%,#eef4ff_100%)] px-4 py-8 sm:px-6 lg:py-10">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex size-20 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="size-10 text-emerald-600" />
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Yêu cầu bồi thường đã được ghi nhận
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-500">
              Cảm ơn bạn đã gửi hồ sơ. Đội ngũ Early Care sẽ xem xét tài liệu và liên hệ bạn trong thời gian sớm nhất.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mt-8 rounded-[32px] border border-[#d9e4ff] bg-white p-6 shadow-[0_20px_60px_rgba(12,59,170,0.08)] sm:p-8"
          >
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[var(--brand-primary)]">
                <Clock3 className="size-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Thời gian thẩm định</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Hồ sơ bồi thường sẽ được thẩm định tự động trong vòng <span className="font-semibold text-slate-900">1–3 ngày làm việc</span>. Kết quả sẽ được thông báo qua email và tin nhắn.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-[#e4ecff] bg-[#f8fbff] px-4 py-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="size-4" />
                </div>
                <p className="text-sm text-slate-700">Tiếp nhận hồ sơ thành công</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#e4ecff] bg-[#f8fbff] px-4 py-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[var(--brand-primary)]">
                  <Clock3 className="size-4" />
                </div>
                <p className="text-sm text-slate-700">Thẩm định tự động (1–3 ngày làm việc)</p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-[#e4ecff] bg-[#f8fbff] px-4 py-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <FileText className="size-4" />
                </div>
                <p className="text-sm text-slate-700">Thông báo kết quả qua email & tin nhắn</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button asChild variant="consult" size="lg" className="h-14 w-full rounded-2xl text-base">
                <Link href="/">
                  <Home className="size-4" />
                  Về trang chủ
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[linear-gradient(180deg,#f5f9ff_0%,#eef4ff_100%)] px-4 py-8 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-[var(--brand-primary)]">
            <FileText className="size-4" />
            Hồ sơ bồi thường Early Care
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Yêu cầu bồi thường</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
            Vui lòng đính kèm tài liệu liên quan và cung cấp thông tin tài khoản để Early Care hỗ trợ chi trả bồi thường.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <section className="rounded-[32px] border border-[#d9e4ff] bg-white p-5 shadow-[0_20px_60px_rgba(12,59,170,0.08)] sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[var(--brand-primary)]">
                <UploadCloud className="size-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">1. Đính kèm tài liệu liên quan</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Tải lên hóa đơn, giấy ra viện, kết quả xét nghiệm hoặc tài liệu hỗ trợ yêu cầu bồi thường.</p>
              </div>
            </div>

            <label
              className={cn(
                "mt-6 flex cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed bg-[#f8fbff] px-6 py-10 text-center transition-colors hover:bg-blue-50/70",
                isPartnerHospital ? "pointer-events-none opacity-40" : "border-[#b8cbff]"
              )}
            >
              <UploadCloud className="size-10 text-[var(--brand-primary)]" />
              <span className="mt-4 text-base font-semibold text-slate-900">Kéo thả hoặc chọn tài liệu</span>
              <span className="mt-2 text-sm text-slate-500">Có thể chọn nhiều file cùng lúc</span>
              <input type="file" multiple className="sr-only" onChange={handleFileChange} disabled={isPartnerHospital} />
            </label>

            {files.length > 0 && !isPartnerHospital && (
              <div className="mt-5 space-y-3">
                {files.map((file, index) => (
                  <div key={`${file.name}-${file.size}-${index}`} className="flex items-center justify-between gap-4 rounded-2xl border border-[#e4ecff] bg-white px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{file.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="flex size-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                      aria-label={`Xóa ${file.name}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-[#d9e4ff] bg-[#f8fbff] p-5">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={isPartnerHospital}
                  onChange={() => setIsPartnerHospital(!isPartnerHospital)}
                  className="mt-1 size-5 shrink-0 cursor-pointer accent-[var(--brand-primary)]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <Hospital className="size-4 text-[var(--brand-primary)]" />
                    <span className="text-sm font-semibold text-slate-900">Tôi khám tại bệnh viện liên kết</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Nếu bạn khám tại bệnh viện liên kết, Early Care sẽ tự động tiếp nhận hồ sơ — không cần đính kèm tài liệu.
                  </p>
                  <p className="mt-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-medium leading-5 text-emerald-700">
                    Người được bảo hiểm không cần nộp hồ sơ khám bệnh — chỉ cần khởi tạo yêu cầu bồi thường và xác thực thông tin. Hệ thống sẽ tự động kiểm duyệt và chi trả.
                  </p>
                </div>
              </label>

              {isPartnerHospital && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 rounded-xl border border-[#e4ecff] bg-white p-4"
                >
                  <p className="mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Danh sách bệnh viện liên kết</p>
                  <ul className="space-y-2">
                    {partnerHospitals.map((name) => (
                      <li key={name} className="flex items-center gap-2 text-sm text-slate-700">
                        <div className="size-1.5 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                        {name}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </section>

          <section className="rounded-[32px] border border-[#d9e4ff] bg-white p-5 shadow-[0_20px_60px_rgba(12,59,170,0.08)] sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[var(--brand-primary)]">
                <Building2 className="size-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">2. Thông tin nhận bồi thường</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">Khoản bồi thường sẽ được chuyển về tài khoản bạn cung cấp sau khi hồ sơ được duyệt.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-5">
              {(Object.keys(bankFieldLabels) as BankField[]).map((field) => (
                <label key={field} className="block">
                  <span className="text-sm font-semibold text-slate-800">{bankFieldLabels[field]}</span>
                  <input
                    value={bankFields[field]}
                    onChange={(event) => updateBankField(field, event.target.value)}
                    placeholder={bankFieldPlaceholders[field]}
                    className={cn(
                      "mt-2 h-14 w-full rounded-2xl border bg-white px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-[var(--brand-primary)]",
                      errors[field] ? "border-red-300" : "border-[#d9e4ff]"
                    )}
                  />
                  {errors[field] && <p className="mt-2 text-sm font-medium text-red-600">{errors[field]}</p>}
                </label>
              ))}
            </div>
          </section>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button type="submit" variant="consult" size="lg" className="h-14 w-full rounded-2xl text-base">
              Gửi yêu cầu bồi thường
            </Button>
          </motion.div>
        </form>
      </div>
    </main>
  )
}