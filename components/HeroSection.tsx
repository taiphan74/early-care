import { HeroContent } from "@/components/HeroContent"
import { HeroIconCluster } from "@/components/HeroIconCluster"

export function HeroSection() {
  return (
    <section id="hero" className="relative h-[calc(100vh-65px)] snap-start flex items-center overflow-hidden">
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
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Left: Text content */}
          <HeroContent />

          {/* Right: Icon cluster */}
          <div className="hidden md:flex md:items-center md:justify-center">
            <HeroIconCluster />
          </div>
        </div>
      </div>
    </section>
  )
}
