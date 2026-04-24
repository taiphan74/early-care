"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import Image from "next/image"

interface IconItem {
  src: string
  alt: string
  label: string
  wrapperClass: string
  size: number
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
}

const iconContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

// Icon trung tâm (shield lớn nhất)
const centerIcon: IconItem = {
  src: "/images/icon-health-protection-shield.png",
  alt: "Bảo vệ sức khỏe",
  label: "",
  wrapperClass: "left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2",
  size: 260,
}

// Icon phụ xung quanh — tất cả cùng kích thước
const surroundingIcons: IconItem[] = [
  {
    src: "/images/icon-medical-check.png",
    alt: "Kiểm tra sức khỏe",
    label: "Bảo vệ toàn diện",
    wrapperClass: "left-[8%] top-[22%]",
    size: 150,
  },
  {
    src: "/images/early-care-icon-stethoscope.png",
    alt: "Ống nghe y tế",
    label: "Khám chữa bệnh",
    wrapperClass: "right-[6%] top-[22%]",
    size: 150,
  },
  {
    src: "/images/icon-healthcare-hospital-3d.png",
    alt: "Bệnh viện",
    label: "Nằm viện & phẫu thuật",
    wrapperClass: "left-[8%] bottom-[20%]",
    size: 150,
  },
  {
    src: "/images/icon-fast-transparent-claim.png",
    alt: "Bồi thường nhanh",
    label: "Minh bạch, nhanh chóng",
    wrapperClass: "right-[8%] bottom-[20%]",
    size: 150,
  },
  {
    src: "/images/icon-health-support.png",
    alt: "Hỗ trợ sức khỏe",
    label: "An tâm tận hưởng",
    wrapperClass: "left-[50%] bottom-[6%] -translate-x-1/2",
    size: 150,
  },
]

function IconWithLabel({
  icon,
  isCenter = false,
  variants,
}: {
  icon: IconItem
  isCenter?: boolean
  variants?: Variants
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={`absolute ${icon.wrapperClass} flex flex-col items-center`}
      variants={variants}
      whileHover={shouldReduceMotion ? undefined : { scale: isCenter ? 1.08 : 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* Fixed-size frame so visual center is consistent regardless of intrinsic aspect ratio */}
      <div
        className="flex items-center justify-center"
        style={{ width: icon.size, height: icon.size }}
      >
        <Image
          src={icon.src}
          alt={icon.alt}
          width={icon.size}
          height={icon.size}
          className="object-contain drop-shadow-lg"
          priority
        />
      </div>

      {/* Label cho icon phụ */}
      {!isCenter && icon.label && (
        <span className="mt-2 max-w-[140px] text-center text-sm font-semibold text-white drop-shadow-md">
          {icon.label}
        </span>
      )}
    </motion.div>
  )
}

export function HeroIconCluster() {
  return (
    <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
      {/* Wrapper cố định vùng visual */}
      <motion.div
        className="relative mx-auto h-full max-w-[720px]"
        variants={iconContainer}
        initial="hidden"
        animate="show"
      >
        {/* Icon trung tâm */}
        <IconWithLabel icon={centerIcon} isCenter variants={fadeUp} />

        {/* Icon phụ xung quanh */}
        {surroundingIcons.map((icon) => (
          <IconWithLabel key={icon.src} icon={icon} variants={fadeUp} />
        ))}
      </motion.div>
    </div>
  )
}
