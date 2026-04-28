import { HeroSection } from "@/components/HeroSection"
import { InsurancePlansSection } from "@/components/sections/insurance-plans/insurance-plans-section"
import { BenefitsComparisonSection } from "@/components/sections/insurance-plans/benefits-comparison-section"
import { BenefitsOverviewSection } from "@/components/sections/insurance-plans/benefits-overview-section"
import { WhyChooseEarlyCareSection } from "@/components/sections/insurance-plans/why-choose-early-care-section"

export default function Home() {
  return (
    <div className="h-[calc(100vh-65px)] overflow-y-scroll snap-y snap-mandatory">
      <HeroSection />
      <InsurancePlansSection />
      <BenefitsComparisonSection />
      <WhyChooseEarlyCareSection />
      <BenefitsOverviewSection />
    </div>
  )
}
