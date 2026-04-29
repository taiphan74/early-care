"use client"

import { motion } from "framer-motion"
import { CircleDot, Gift, Heart, Hospital, Search, Shield } from "lucide-react"

const easeArr = [0.25, 0.1, 0.25, 1] as const

type RowType = "header" | "section" | "row" | "subrow" | "subsubrow"

interface TableRow {
  type: RowType
  label: string
  icon?: string
  basic?: string
  premium?: string
  advanced?: string
}

const tableData: TableRow[] = [
  { type: "row", label: "Số tiền bảo hiểm", basic: "250.000.000", premium: "500.000.000", advanced: "1.000.000.000" },
  { type: "row", label: "Phí bảo hiểm", basic: "1.000.000", premium: "2.100.000", advanced: "4.300.000" },
  { type: "section", label: "QUYỀN LỢI BẢO HIỂM CHÍNH", icon: "shield" },
  { type: "row", label: "1. Quyền lợi bảo hiểm bệnh Ung thư", icon: "shield" },
  { type: "subrow", label: "1.1 Ung thư không xâm lấn (Giai đoạn 0) – Chi trả 1 lần", basic: "15%", premium: "15%", advanced: "15%" },
  { type: "subrow", label: "1.2 Ung thư giai đoạn sớm (Giai đoạn 1,2)", basic: "25%", premium: "25%", advanced: "25%" },
  { type: "subrow", label: "1.3 Ung thư giai đoạn trễ", basic: "", premium: "", advanced: "" },
  { type: "subsubrow", label: "1.3.1 Chẩn đoán ung thư giai đoạn trễ từ Giai đoạn 3 – Trừ quyền lợi đã chi trả trước đó", basic: "70%", premium: "70%", advanced: "70%" },
  { type: "subsubrow", label: "1.3.2 Chẩn đoán ung thư giai đoạn trễ từ Giai đoạn 4 – Trừ quyền lợi đã chi trả trước đó", basic: "100%", premium: "100%", advanced: "100%" },
  { type: "row", label: "2. Quyền lợi trợ cấp nằm viện", icon: "hospital" },
  { type: "subrow", label: "2.1 Ung thư giai đoạn sớm (trong vòng 06 tháng kể từ ngày có chẩn đoán ung thư giai đoạn sớm) – Tối đa chi trả 30 ngày/năm – Chi trả theo chi phí thực tế", basic: "0.2%/ngày", premium: "0.2%/ngày", advanced: "0.2%/ngày" },
  { type: "subrow", label: "2.2 Ung thư giai đoạn trễ (trong vòng 12 tháng kể từ ngày có chẩn đoán ung thư giai đoạn trễ) – Tối đa chi trả 30 ngày/năm – Chi trả theo chi phí thực tế", basic: "0.2%/ngày", premium: "0.2%/ngày", advanced: "0.2%/ngày" },
  { type: "row", label: "3. Quyền lợi khám & Chẩn đoán sớm", icon: "search" },
  { type: "subrow", label: "Chi phí tầm soát ung thư – Chi trả theo chi phí thực tế", basic: "50% chi phí khám", premium: "50% chi phí khám", advanced: "50% chi phí khám" },
  { type: "subrow", label: "Tối đa chi trả/năm", basic: "3.000.000", premium: "6.000.000", advanced: "10.000.000" },
  { type: "row", label: "4. Quyền lợi tử vong do bệnh Ung thư", icon: "heart" },
  { type: "subrow", label: "", basic: "5%", premium: "5%", advanced: "5%" },
]

const supplementalBenefitsData: TableRow[] = [
  { type: "section", label: "QUYỀN LỢI BỔ SUNG", icon: "gift" },
  { type: "row", label: "Early Detection Bonus", icon: "circle", basic: "+5%", premium: "+6%", advanced: "+8%" },
  { type: "row", label: "Tư vấn sức khỏe định kỳ", icon: "heart", basic: "Có", premium: "Có", advanced: "Có" },
  { type: "row", label: "Đặt lịch khám ưu tiên", icon: "shield", basic: "-", premium: "Có", advanced: "Có" },
]

function getIcon(iconName?: string) {
  switch (iconName) {
    case "shield": return <Shield className="h-4 w-4 shrink-0 text-[var(--brand-primary)]" />
    case "hospital": return <Hospital className="h-4 w-4 shrink-0 text-[var(--brand-primary)]" />
    case "search": return <Search className="h-4 w-4 shrink-0 text-[var(--brand-primary)]" />
    case "heart": return <Heart className="h-4 w-4 shrink-0 text-[var(--brand-primary)]" />
    case "gift": return <Gift className="h-4 w-4 shrink-0 text-emerald-600" />
    case "circle": return <CircleDot className="h-4 w-4 shrink-0 text-emerald-600" />
    default: return null
  }
}

function TableRowComponent({ row, tone = "primary" }: { row: TableRow; tone?: "primary" | "emerald" }) {
  const isSection = row.type === "section"
  const isSubRow = row.type === "subrow"
  const isSubSubRow = row.type === "subsubrow"
  const sectionTone = tone === "emerald" ? "bg-emerald-50 text-emerald-700" : "bg-[var(--brand-primary)]/5 text-[var(--brand-primary)]"
  const valueTone = tone === "emerald" ? "text-emerald-700" : "text-[var(--brand-primary)]"

  const labelBase = isSection
    ? `${sectionTone} font-bold text-sm`
    : isSubSubRow
      ? "bg-white text-muted-foreground text-xs"
      : isSubRow
        ? "bg-white text-muted-foreground text-xs"
        : "bg-white text-foreground text-sm font-medium"

  const cellBase = isSection ? sectionTone : "bg-white"

  const labelPadding = isSubSubRow ? "pl-8" : isSubRow ? "pl-6" : "pl-4"

  return (
    <div className="contents">
      <div
        className={`${labelBase} ${labelPadding} py-1 px-3 flex items-start gap-2 border-b border-gray-100`}
      >
        {row.icon && getIcon(row.icon)}
        <span className={isSubRow || isSubSubRow ? "leading-relaxed" : ""}>{row.label}</span>
      </div>
      <div
        className={`${cellBase} py-1.5 px-3 text-center text-sm font-semibold ${valueTone} border-b border-gray-100`}
      >
        {row.basic || ""}
      </div>
      <div
        className={`${tone === "emerald" ? "bg-emerald-50" : "bg-[var(--brand-primary)]/5"} py-1.5 px-3 text-center text-sm font-semibold ${valueTone} border-b border-gray-100/50`}
      >
        {row.premium || ""}
      </div>
      <div
        className={`${cellBase} py-1.5 px-3 text-center text-sm font-semibold ${valueTone} border-b border-gray-100`}
      >
        {row.advanced || ""}
      </div>
    </div>
  )
}

export function BenefitsComparisonSection() {
  return (
    <section id="benefits" className="relative h-[calc(100vh-65px)] snap-start overflow-hidden bg-white py-3">
      <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeArr }}
          className="mb-2 shrink-0 text-center"
        >
          <h2 className="text-lg font-bold text-[var(--brand-primary)] sm:text-xl">
            Bảng quyền lợi chi tiết
          </h2>
          <p className="mx-auto mt-0.5 max-w-2xl text-xs text-muted-foreground sm:text-sm">
            So sánh chi tiết quyền lợi bảo hiểm giữa ba gói để người dùng dễ dàng lựa chọn gói phù hợp.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeArr, delay: 0.2 }}
          className="flex-1 overflow-auto"
        >
          <div className="min-w-[900px] rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_160px_160px_160px]">
              {/* Empty top-left */}
              <div className="bg-white p-3" />
              {/* Plan headers */}
              <div className="bg-white p-3 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Shield className="h-5 w-5 text-[var(--brand-primary)]" />
                  <span className="text-sm font-semibold text-foreground">Gói cơ bản</span>
                </div>
              </div>
              <div className="bg-[var(--brand-primary)] p-3 text-center rounded-t-lg">
                <div className="flex items-center justify-center">
                  <span className="whitespace-nowrap text-sm font-semibold text-white">Gói nâng cao</span>
                </div>
              </div>
              <div className="bg-white p-3 text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <Shield className="h-5 w-5 text-[var(--brand-primary)]" />
                  <span className="text-sm font-semibold text-foreground">Gói toàn diện</span>
                </div>
              </div>
            </div>

            {/* Table body */}
            <div className="grid grid-cols-[1fr_160px_160px_160px]">
              {tableData.map((row, idx) => (
                <TableRowComponent key={idx} row={row} />
              ))}
            </div>

            <div className="grid grid-cols-[1fr_160px_160px_160px] border-t border-emerald-100">
              {supplementalBenefitsData.map((row, idx) => (
                <TableRowComponent key={idx} row={row} tone="emerald" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
