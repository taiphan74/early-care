import { HeroContent } from "@/components/HeroContent"
import { HeroIconCluster } from "@/components/HeroIconCluster"

export function HeroSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden lg:min-h-[600px]">
      {/* Multi-layer gradient: linear base + radial highlight */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 65% 45%, rgba(255,255,255,0.55), transparent 40%),
            linear-gradient(135deg, var(--brand-primary) 0%, #3B82F6 45%, #EAF2FF 100%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[500px] flex-col justify-center py-16 lg:min-h-[600px] lg:py-24">
          {/* Left: Text content */}
          <HeroContent />
        </div>
      </div>

      {/* Right: Icon cluster */}
      <HeroIconCluster />
    </section>
  )
}
