import { create } from "zustand"
import type { Plan } from "@/components/sections/insurance-plans/data"

export type PlanSummary = Pick<
  Plan,
  "id" | "name" | "tagline" | "coverageAmount" | "price" | "pricePeriod" | "features"
>

export type BuyerType = "self" | "relative"
export type Gender = "male" | "female"
export type HealthAnswer = "no" | "yes"

export type ApplicationDraft = {
  buyerType: BuyerType
  relationship: string
  fullName: string
  dateOfBirth: string
  gender: Gender
  phone: string
  email: string
  occupation: string
  identityNumber: string
  identityIssuedDate: string
  identityIssuedPlace: string
  healthAnswers: HealthAnswer[]
  committed: boolean
}

type ApplicationStore = {
  selectedPlan: PlanSummary | null
  applicationDraft: ApplicationDraft | null
  selectPlan: (plan: PlanSummary) => void
  saveApplicationDraft: (draft: ApplicationDraft) => void
  resetApplication: () => void
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  selectedPlan: null,
  applicationDraft: null,
  selectPlan: (plan) => set({ selectedPlan: plan, applicationDraft: null }),
  saveApplicationDraft: (draft) => set({ applicationDraft: draft }),
  resetApplication: () => set({ selectedPlan: null, applicationDraft: null }),
}))
