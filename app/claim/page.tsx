import Image from "next/image"

export default function ClaimPage() {
  return (
    <main className="h-[calc(100vh-65px)] overflow-hidden bg-white px-2 py-4 sm:px-4 lg:py-6">
      <div className="mx-auto flex h-full max-w-[1500px] items-center justify-center">
        <Image
          src="/images/claim-compensation-guide.png"
          alt="Quy trình bồi thường"
          width={1920}
          height={1080}
          className="max-h-full w-auto max-w-full rounded-2xl object-contain shadow-[0_20px_60px_rgba(12,59,170,0.12)]"
          priority
        />
      </div>
    </main>
  )
}
