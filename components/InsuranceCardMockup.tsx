import Image from "next/image"

export function InsuranceCardMockup() {
  return (
    <div className="relative mx-auto aspect-[1449/1032] w-full max-w-[620px] drop-shadow-[0_28px_60px_rgba(5,28,90,0.28)]">
      <Image
        src="/images/early-care-insurance-card-mockup.png"
        alt="Thẻ bảo hiểm điện tử EarlyCare"
        fill
        priority
        className="select-none object-contain"
        sizes="(min-width: 768px) 50vw, 92vw"
      />
    </div>
  )
}
