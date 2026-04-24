import { Shield, Heart, Handshake, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const sellingPoints = [
  {
    icon: Shield,
    title: "Bảo vệ toàn diện",
    description:
      "Chi trả chi phí khám chữa bệnh, nằm viện, phẫu thuật và thậm chí hơn thế nữa.",
  },
  {
    icon: Heart,
    title: "Linh hoạt lựa chọn",
    description:
      "Nhiều gói bảo hiểm phù hợp với nhu cầu và ngân sách của bạn.",
  },
  {
    icon: Handshake,
    title: "Dịch vụ tận tâm",
    description: "Hỗ trợ 24/7, giải quyết nhanh chóng và minh bạch.",
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden lg:min-h-[600px]">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--brand-primary), #1e5de0, var(--brand-secondary))",
        }}
      />

      {/* Illustration — desktop absolute right, mobile cropped */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block lg:w-[45%]">
        <img
          src="/images/early-care-hero-insurance-illustration.png"
          alt="Bảo hiểm sức khỏe"
          className="hero-float h-full w-full object-cover object-left"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[500px] flex-col justify-center py-16 lg:min-h-[600px] lg:py-24">
          {/* Text block — constrained width on desktop */}
          <div className="max-w-xl lg:max-w-[55%]">
            {/* Label */}
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-white/80">
              SẢN PHẨM BẢO HIỂM
            </span>

            {/* Heading */}
            <h1 className="mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Bảo hiểm
              <br />
              sức khỏe cá nhân
            </h1>

            {/* Subheadline */}
            <p className="mb-8 text-base text-white/90 sm:text-lg">
              Chủ động bảo vệ sức khỏe – An tâm tận hưởng cuộc sống
            </p>

            {/* Selling points */}
            <ul className="mb-8 space-y-4">
              {sellingPoints.map((point) => {
                const Icon = point.icon
                return (
                  <li key={point.title} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">
                        {point.title}
                      </p>
                      <p className="text-sm text-white/75">
                        {point.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="consult"
                size="lg"
                className="gap-2 rounded-full px-6 text-sm font-semibold"
              >
                TÌM HIỂU THÊM
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <Play className="h-4 w-4" fill="white" />
                XEM VIDEO GIỚI THIỆU
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
