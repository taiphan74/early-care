"use client"

import { motion } from "framer-motion"
import { Activity, ArrowRight, Bot, ClipboardCheck, LockKeyhole, ShieldCheck, Smartphone, Stethoscope } from "lucide-react"

const easeArr = [0.25, 0.1, 0.25, 1] as const

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeArr },
  },
}

const highlights = [
  { icon: Bot, label: "Cá nhân hóa bằng AI" },
  { icon: Stethoscope, label: "Tầm soát phát hiện sớm" },
  { icon: ClipboardCheck, label: "Bồi thường nhanh chóng" },
  { icon: LockKeyhole, label: "Bảo mật tối ưu" },
]

const reasons = [
  {
    number: "01",
    icon: Bot,
    title: "AI cá nhân hóa phí bảo hiểm",
    description:
      "AI phân tích độ tuổi, giới tính, tiền sử bệnh và dữ liệu sức khỏe để đánh giá rủi ro, từ đó đề xuất mức phí phù hợp cho từng cá nhân.",
  },
  {
    number: "02",
    icon: Smartphone,
    title: "Kết nối dữ liệu sức khỏe",
    description:
      "Đồng bộ dữ liệu từ ứng dụng sức khỏe và thiết bị đeo để cập nhật thông tin chính xác, giúp Early Care đánh giá rủi ro toàn diện hơn.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Mua bảo hiểm nhanh chóng",
    description:
      "Quy trình 100% online: chọn gói, nhận đề xuất, ký điện tử thông tin và hoàn tất thanh toán chỉ trong vài phút.",
  },
  {
    number: "04",
    icon: Activity,
    title: "Bồi thường nhanh chóng",
    description:
      "Ứng dụng AI và tự động hóa giúp tiếp nhận hồ sơ, thẩm định và chi trả quyền lợi minh bạch, giảm thời gian chờ đợi.",
  },
]

export function WhyChooseEarlyCareSection() {
  return (
    <section className="relative h-[calc(100vh-65px)] snap-start overflow-hidden bg-gradient-to-br from-blue-50 via-white to-sky-50 py-8 sm:py-10">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[var(--brand-primary)]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[var(--brand-secondary)]/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-blue-100/50 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-center gap-6 px-4 sm:px-6 lg:px-10"
      >
        <div className="grid items-end gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div variants={fadeUpVariants} className="max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-primary)]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-primary)] sm:text-sm">
              <ShieldCheck className="h-4 w-4" />
              4 lý do nên chọn Early Care
            </span>

            <div className="space-y-3">
              <h2 className="text-3xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-[3.35rem]">
                Tại sao nên chọn <span className="text-[var(--brand-primary)]">Early Care?</span>
              </h2>
              <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Early Care kết hợp AI, tầm soát phát hiện sớm, cá nhân hóa phí bảo hiểm và hỗ trợ bồi thường nhanh chóng trên nền tảng số.
              </p>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
            {highlights.map(({ icon: Icon, label }) => (
              <motion.div
                key={label}
                variants={fadeUpVariants}
                className="group flex flex-col items-center justify-center gap-3 rounded-3xl border border-blue-100 bg-white/75 p-4 text-center shadow-sm backdrop-blur-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-950/10"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-secondary)] text-white shadow-lg shadow-blue-900/20 transition group-hover:scale-105">
                  <Icon className="h-7 w-7" />
                </span>
                <span className="text-sm font-bold leading-5 text-slate-900">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={containerVariants} className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map(({ number, icon: Icon, title, description }) => (
            <motion.article
              key={number}
              variants={fadeUpVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-blue-100 bg-white/85 p-5 shadow-lg shadow-blue-950/8 backdrop-blur-sm"
            >
              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[var(--brand-secondary)]/10 transition group-hover:bg-[var(--brand-secondary)]/20" />

              <div className="relative flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-lg font-bold text-white shadow-lg shadow-blue-900/20">
                  {number}
                </span>
                <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-[var(--brand-primary)] ring-1 ring-blue-100">
                  <Icon className="h-8 w-8" />
                </span>
              </div>

              <div className="relative mt-6 space-y-4">
                <h3 className="text-xl font-bold leading-snug text-[var(--brand-primary)]">{title}</h3>
                <p className="text-sm leading-6 text-slate-600">{description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-primary)]">
                  Tìm hiểu thêm
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
