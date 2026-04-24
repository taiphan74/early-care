"use client"

import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"

interface IconConfig {
  src: string
  alt: string
  width: number
  height: number
  position: { right?: string; left?: string; top?: string; bottom?: string }
  delay: number
  priority?: boolean
}

const icons: IconConfig[] = [
  {
    src: "/images/icon-health-protection-shield.png",
    alt: "Bảo vệ sức khỏe",
    width: 120,
    height: 120,
    position: { right: "10%", top: "8%" },
    delay: 0,
    priority: true,
  },
  {
    src: "/images/icon-medical-check.png",
    alt: "Kiểm tra sức khỏe",
    width: 90,
    height: 90,
    position: { left: "5%", top: "28%" },
    delay: 0.5,
    priority: true,
  },
  {
    src: "/images/icon-health-support.png",
    alt: "Hỗ trợ sức khỏe",
    width: 85,
    height: 85,
    position: { right: "8%", top: "30%" },
    delay: 1,
    priority: true,
  },
  {
    src: "/images/early-care-icon-stethoscope.png",
    alt: "Ống nghe y tế",
    width: 100,
    height: 100,
    position: { right: "30%", top: "45%" },
    delay: 1.5,
    priority: true,
  },
  {
    src: "/images/icon-healthcare-hospital-3d.png",
    alt: "Bệnh viện",
    width: 90,
    height: 90,
    position: { left: "15%", bottom: "15%" },
    delay: 2,
    priority: true,
  },
  {
    src: "/images/icon-fast-transparent-claim.png",
    alt: "Bồi thường nhanh chóng",
    width: 80,
    height: 80,
    position: { right: "5%", bottom: "10%" },
    delay: 2.5,
    priority: true,
  },
]

export function HeroIconCluster() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block">
      {icons.map((icon) => (
        <motion.div
          key={icon.src}
          className="absolute"
          style={icon.position}
          animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: icon.delay,
                }
          }
          whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
        >
          <Image
            src={icon.src}
            alt={icon.alt}
            width={icon.width}
            height={icon.height}
            className="opacity-80"
            priority={icon.priority}
            sizes="(max-width: 768px) 0px, 15vw"
          />
        </motion.div>
      ))}
    </div>
  )
}
