import { HeroContent } from "@/components/HeroContent"
import { HeroIconCluster } from "@/components/HeroIconCluster"

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
