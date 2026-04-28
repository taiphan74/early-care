"use client"

import { type ChangeEvent, type FormEvent, useState } from "react"
import { motion } from "framer-motion"
import { Building2, CheckCircle2, FileText, Trash2, UploadCloud } from "lucide-react"
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

export function ClaimPageClient() {
  const [files, setFiles] = useState<File[]>([])
  const [bankFields, setBankFields] = useState<Record<BankField, string>>({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  })
  const [errors, setErrors] = useState<ClaimFormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? [])

    if (selectedFiles.length > 0) {
      setFiles((currentFiles) => [...currentFiles, ...selectedFiles])
      setErrors((currentErrors) => ({ ...currentErrors, documents: undefined }))
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
      fileCount: files.length,
      bankName: bankFields.bankName,
      accountNumber: bankFields.accountNumber,
      accountHolder: bankFields.accountHolder,
    })

    setErrors(result.errors)
    setSubmitted(result.valid)
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

        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex items-start gap-3 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-700"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-semibold">Hồ sơ bồi thường đã được ghi nhận.</p>
              <p className="mt-1 text-sm text-emerald-600">Chúng tôi sẽ kiểm tra tài liệu và liên hệ bạn trong thời gian sớm nhất.</p>
            </div>
          </motion.div>
        )}

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
                errors.documents ? "border-red-300" : "border-[#b8cbff]"
              )}
            >
              <UploadCloud className="size-10 text-[var(--brand-primary)]" />
              <span className="mt-4 text-base font-semibold text-slate-900">Kéo thả hoặc chọn tài liệu</span>
              <span className="mt-2 text-sm text-slate-500">Có thể chọn nhiều file cùng lúc</span>
              <input type="file" multiple className="sr-only" onChange={handleFileChange} />
            </label>
            {errors.documents && <p className="mt-3 text-sm font-medium text-red-600">{errors.documents}</p>}

            {files.length > 0 && (
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
