"use client"

import type { FormEvent, ReactNode } from "react"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Check, ClipboardCheck, Info, ShieldPlus, User, Users } from "lucide-react"
import { motion } from "framer-motion"
import { useApplicationStore, type ApplicationDraft, type BuyerType, type Gender, type HealthAnswer } from "@/stores/application-store"
import { StepIndicator } from "@/components/StepIndicator"
import { cn } from "@/lib/utils"
import { healthQuestions, questionFiveDetails } from "./health-declaration"

const relationshipOptions = ["Vợ/chồng", "Con", "Bố/mẹ"]
const occupationOptions = ["Nhân viên văn phòng", "Kinh doanh", "Giáo viên", "Kỹ sư", "Khác"]

const initialDraft: ApplicationDraft = {
  buyerType: "self",
  relationship: "",
  fullName: "Nguyễn Văn A",
  dateOfBirth: "1985-03-15",
  gender: "male",
  phone: "0901234567",
  email: "nguyenvana@email.com",
  occupation: "Nhân viên văn phòng",
  identityNumber: "079085123456",
  identityIssuedDate: "2020-06-20",
  identityIssuedPlace: "TP.HCM",
  healthAnswers: ["no", "no", "no", "no", "no"],
  committed: true,
}

type ValidationErrors = Partial<Record<keyof ApplicationDraft, string>>

function validateDraft(draft: ApplicationDraft) {
  const errors: ValidationErrors = {}

  if (draft.buyerType === "relative" && !draft.relationship) {
    errors.relationship = "Vui lòng chọn quan hệ với người được bảo hiểm."
  }

  if (!draft.fullName.trim()) errors.fullName = "Vui lòng nhập họ và tên."
  if (!draft.dateOfBirth) errors.dateOfBirth = "Vui lòng nhập ngày sinh."
  if (!draft.phone.trim()) errors.phone = "Vui lòng nhập số điện thoại."
  if (!draft.occupation) errors.occupation = "Vui lòng chọn nghề nghiệp."
  if (!draft.identityNumber.trim()) errors.identityNumber = "Vui lòng nhập số CMND/CCCD/Hộ chiếu."
  if (!draft.committed) errors.committed = "Vui lòng xác nhận cam kết thông tin."

  return errors
}

export function ApplicationPageClient() {
  const router = useRouter()
  const selectedPlan = useApplicationStore((state) => state.selectedPlan)
  const savedDraft = useApplicationStore((state) => state.applicationDraft)
  const saveApplicationDraft = useApplicationStore((state) => state.saveApplicationDraft)

  const [draft, setDraft] = useState<ApplicationDraft>(() => ({ ...initialDraft, ...savedDraft }))
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!selectedPlan) {
      router.replace("/#plans")
    }
  }, [router, selectedPlan])

  const answeredCount = useMemo(
    () => draft.healthAnswers.filter((answer) => answer === "no" || answer === "yes").length,
    [draft.healthAnswers]
  )

  if (!selectedPlan) {
    return null
  }

  const updateField = <Key extends keyof ApplicationDraft>(key: Key, value: ApplicationDraft[Key]) => {
    setDraft((current) => ({ ...current, [key]: value }))
    setSaved(false)
    setErrors((current) => ({ ...current, [key]: undefined }))
  }

  const updateBuyerType = (buyerType: BuyerType) => {
    setDraft((current) => ({
      ...current,
      buyerType,
      relationship: buyerType === "self" ? "" : current.relationship,
    }))
    setSaved(false)
    setErrors((current) => ({ ...current, buyerType: undefined, relationship: undefined }))
  }

  const updateHealthAnswer = (index: number, answer: HealthAnswer) => {
    setDraft((current) => {
      const healthAnswers = [...current.healthAnswers]
      healthAnswers[index] = answer
      return { ...current, healthAnswers }
    })
    setSaved(false)
  }

  const handleBackToPlans = () => {
    router.push("/#plans")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateDraft(draft)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setSaved(false)
      return
    }

    saveApplicationDraft(draft)
    setErrors({})
    setSaved(true)
    router.push("/review")
  }

  return (
    <main className="min-h-[calc(100vh-65px)] bg-[linear-gradient(180deg,#eff6ff_0%,#f8fbff_45%,#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <StepIndicator activeStep={0} />

        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary)]">
              <ShieldPlus className="h-4 w-4" />
              Hồ sơ tham gia bảo hiểm
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Nhập thông tin & Khai báo để tham gia bảo hiểm
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
              Vui lòng cung cấp thông tin chính xác để chúng tôi xác nhận điều kiện tham gia cho bạn.
            </p>
          </div>

          <div className="rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm lg:min-w-80">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Gói đã chọn</p>
            <h2 className="mt-1 text-lg font-bold text-[var(--brand-primary)]">{selectedPlan.name}</h2>
            <p className="text-sm text-slate-600">{selectedPlan.tagline}</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-blue-50 p-3">
                <p className="text-xs text-slate-500">Bảo hiểm</p>
                <p className="font-semibold text-slate-950">{selectedPlan.coverageAmount}</p>
              </div>
              <div className="rounded-xl bg-blue-50 p-3">
                <p className="text-xs text-slate-500">Phí/năm</p>
                <p className="font-semibold text-slate-950">
                  {selectedPlan.price}
                  <span className="text-xs text-slate-500">{selectedPlan.pricePeriod}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <section className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">1</span>
              <h2 className="text-lg font-bold text-slate-950">Bạn muốn mua bảo hiểm cho ai?</h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_1fr_300px]">
              <BuyerCard
                active={draft.buyerType === "self"}
                icon={<User className="h-7 w-7" />}
                title="Cho chính tôi"
                description="Tôi là người được bảo hiểm"
                onClick={() => updateBuyerType("self")}
              />
              <BuyerCard
                active={draft.buyerType === "relative"}
                icon={<Users className="h-7 w-7" />}
                title="Cho người thân"
                description="Vợ/chồng, con, bố mẹ..."
                onClick={() => updateBuyerType("relative")}
              />
              <div className="rounded-2xl bg-blue-50 p-4 text-sm text-slate-700">
                <div className="mb-2 flex items-center gap-2 font-semibold text-[var(--brand-primary)]">
                  <Info className="h-4 w-4" />
                  Lưu ý
                </div>
                <p>Tuổi tham gia: Từ 18 đến 65 tuổi.</p>
              </div>
            </div>

            {draft.buyerType === "relative" && (
              <div className="mt-4 max-w-xl">
                <SelectField
                  label="Quan hệ với người được bảo hiểm"
                  value={draft.relationship}
                  onChange={(value) => updateField("relationship", value)}
                  options={relationshipOptions}
                  placeholder="Chọn người thân được bảo hiểm"
                  error={errors.relationship}
                  required
                />
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">2</span>
              <h2 className="text-lg font-bold text-slate-950">Thông tin người được bảo hiểm (NĐBH)</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <TextField label="Họ và tên" value={draft.fullName} onChange={(value) => updateField("fullName", value)} placeholder="Nhập họ và tên đầy đủ" error={errors.fullName} required />
              <TextField label="Ngày sinh" type="date" value={draft.dateOfBirth} onChange={(value) => updateField("dateOfBirth", value)} error={errors.dateOfBirth} required />
              <GenderField value={draft.gender} onChange={(value) => updateField("gender", value)} />
              <TextField label="Số điện thoại" value={draft.phone} onChange={(value) => updateField("phone", value)} placeholder="Nhập số điện thoại" error={errors.phone} required />
              <TextField label="Email" type="email" value={draft.email} onChange={(value) => updateField("email", value)} placeholder="Nhập email (không bắt buộc)" />
              <SelectField label="Nghề nghiệp" value={draft.occupation} onChange={(value) => updateField("occupation", value)} options={occupationOptions} placeholder="Chọn nghề nghiệp" error={errors.occupation} required />
              <TextField label="CMND/CCCD/Hộ chiếu" value={draft.identityNumber} onChange={(value) => updateField("identityNumber", value)} placeholder="Nhập số CMND/CCCD/Hộ chiếu" error={errors.identityNumber} required />
              <TextField label="Ngày cấp" type="date" value={draft.identityIssuedDate} onChange={(value) => updateField("identityIssuedDate", value)} />
              <TextField label="Nơi cấp" value={draft.identityIssuedPlace} onChange={(value) => updateField("identityIssuedPlace", value)} placeholder="Nhập nơi cấp" />
            </div>
          </section>

          <section className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">3</span>
                  <h2 className="text-lg font-bold text-slate-950">Khai báo sức khỏe</h2>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Vui lòng trả lời trung thực và đầy đủ năm câu hỏi dưới đây để chúng tôi xác nhận điều kiện tham gia bảo hiểm.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                {answeredCount}/5 câu hỏi
                <Check className="h-4 w-4" />
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              {healthQuestions.map((question, index) => (
                <div key={question} className="border-b border-slate-200 p-4 last:border-b-0">
                  <div className="grid gap-3 lg:grid-cols-[36px_1fr_220px] lg:items-center">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-[var(--brand-primary)]">{index + 1}</span>
                    <p className="text-sm font-medium text-slate-800">{question}</p>
                    <div className="flex gap-4">
                      <RadioPill active={draft.healthAnswers[index] === "no"} label="Không" tone="green" onClick={() => updateHealthAnswer(index, "no")} />
                      <RadioPill active={draft.healthAnswers[index] === "yes"} label="Có" tone="red" onClick={() => updateHealthAnswer(index, "yes")} />
                    </div>
                  </div>

                  {index === 4 && (
                    <div className="mt-4 space-y-3 rounded-2xl bg-blue-50/70 p-3 lg:ml-12">
                      {questionFiveDetails.map((detail, detailIndex) => (
                        <div key={detail} className="grid gap-3 rounded-xl bg-white p-3 lg:grid-cols-[44px_1fr] lg:items-center">
                          <span className="text-sm font-bold text-[var(--brand-primary)]">5.{detailIndex + 1}</span>
                          <p className="text-sm text-slate-700">{detail}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl bg-blue-50 p-4 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={draft.committed}
                onChange={(event) => updateField("committed", event.target.checked)}
                className="mt-1 h-5 w-5 rounded border-blue-200 accent-[var(--brand-primary)]"
              />
              <span>
                <span className="block font-semibold text-slate-950">Tôi cam kết những thông tin khai báo trên là hoàn toàn đúng sự thật.</span>
                <span>Nếu thông tin sai lệch, tôi hoàn toàn chịu trách nhiệm và doanh nghiệp bảo hiểm có quyền từ chối chi trả quyền lợi.</span>
                {errors.committed && <span className="mt-1 block text-sm font-medium text-red-600">{errors.committed}</span>}
              </span>
            </label>
          </section>

          <div className="sticky bottom-0 z-10 rounded-3xl border border-blue-100 bg-white/95 p-4 shadow-lg backdrop-blur-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={handleBackToPlans}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-[var(--brand-primary)]"
              >
                <ArrowLeft className="h-4 w-4" />
                Quay lại
              </motion.button>

              <div className="flex flex-col items-center gap-3 sm:flex-row">
                {saved && (
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700">
                    <ClipboardCheck className="h-4 w-4" />
                    Đã lưu thông tin bước 1
                  </span>
                )}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-[var(--brand-primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/20"
                >
                  Tiếp tục
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

function BuyerCard({ active, icon, title, description, onClick }: { active: boolean; icon: ReactNode; title: string; description: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn("relative rounded-2xl border p-5 text-center transition-colors", active ? "border-[var(--brand-primary)] bg-blue-50" : "border-slate-200 bg-white hover:bg-blue-50/60")}
    >
      <span className={cn("absolute left-4 top-4 h-5 w-5 rounded-full border", active ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] ring-4 ring-blue-100" : "border-slate-300 bg-white")} />
      <div className={cn("mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl", active ? "text-[var(--brand-primary)]" : "text-slate-500")}>{icon}</div>
      <h3 className="font-bold text-slate-950">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </button>
  )
}

function TextField({ label, value, onChange, placeholder, error, type = "text", required = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; error?: string; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={cn("w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]", error ? "border-red-300" : "border-slate-200")}
      />
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  )
}

function SelectField({ label, value, onChange, options, placeholder, error, required = false }: { label: string; value: string; onChange: (value: string) => void; options: string[]; placeholder: string; error?: string; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn("w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--brand-primary)]", error ? "border-red-300" : "border-slate-200")}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  )
}

function GenderField({ value, onChange }: { value: Gender; onChange: (value: Gender) => void }) {
  return (
    <fieldset className="text-sm">
      <legend className="mb-2 block font-medium text-slate-700">Giới tính <span className="text-red-500">*</span></legend>
      <div className="flex gap-4 rounded-xl border border-slate-200 px-3 py-2.5">
        <RadioPill active={value === "male"} label="Nam" onClick={() => onChange("male")} />
        <RadioPill active={value === "female"} label="Nữ" onClick={() => onChange("female")} />
      </div>
    </fieldset>
  )
}

function RadioPill({ active, label, onClick, tone = "blue" }: { active: boolean; label: string; onClick: () => void; tone?: "blue" | "green" | "red" }) {
  const activeClass = tone === "green" ? "border-emerald-500 text-emerald-700" : tone === "red" ? "border-rose-500 text-rose-700" : "border-[var(--brand-primary)] text-[var(--brand-primary)]"

  return (
    <button type="button" onClick={onClick} className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium", active ? activeClass : "border-slate-200 text-slate-500")}>
      <span className={cn("h-3 w-3 rounded-full border", active ? "border-current bg-current" : "border-slate-300")} />
      {label}
    </button>
  )
}