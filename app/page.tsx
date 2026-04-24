import { HeroSection } from "@/components/HeroSection"
import { InsurancePlansSection } from "@/components/sections/insurance-plans/insurance-plans-section"

export default function Home() {
  return (
    <div className="h-[calc(100vh-65px)] overflow-y-scroll snap-y snap-mandatory">
      <HeroSection />
      <InsurancePlansSection />
    </div>
  )
}
