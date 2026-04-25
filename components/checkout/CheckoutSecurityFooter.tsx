import { BadgeCheck, Shield } from "lucide-react"

export function CheckoutSecurityFooter() {
  return (
    <section className="mt-6 grid grid-cols-2 gap-4 rounded-[24px] border border-[#dce7ff] bg-white px-6 py-5 shadow-[0_14px_45px_rgba(12,59,170,0.06)]">
      <div className="flex items-start gap-4">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-[#edf4ff] text-[var(--brand-primary)]">
          <Shield className="size-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Cam kết bảo mật thông tin</h3>
          <p className="mt-1 text-sm text-slate-500">
            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo tiêu chuẩn bảo mật cao nhất.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-[#edf4ff] text-[var(--brand-primary)]">
          <BadgeCheck className="size-5" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Đạt chuẩn bảo mật quốc tế</h3>
          <p className="mt-1 text-sm text-slate-500">
            Hệ thống thanh toán đạt chứng nhận bảo mật theo chuẩn quốc tế cho giao dịch trực tuyến.
          </p>
        </div>
      </div>
    </section>
  )
}
