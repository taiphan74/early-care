"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import Image from "next/image"
import { createPlansNavigator } from "./header-navigation"

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/images/logo.png"
        alt="Early Care"
        width={36}
        height={36}
        className="size-9"
      />
      <span className="text-xl font-bold text-[var(--brand-primary)]">Early Care</span>
    </Link>
  )
}

const productItems = [
  { title: "Bảo hiểm Cơ bản", subtitle: "Khởi đầu bảo vệ sức khỏe mỗi ngày" },
  { title: "Bảo hiểm Nâng cao", subtitle: "Bảo vệ toàn diện trước rủi ro lớn" },
  { title: "Bảo hiểm Toàn diện", subtitle: "Bảo vệ toàn diện trước mọi rủi ro" },
]


export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const navigateToPlans = createPlansNavigator({
    getPathname: () => pathname,
    push: (href) => router.push(href),
    scrollToPlans: () => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" }),
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Logo />
          <div className="hidden h-8 w-px bg-border md:block" />
          <div className="hidden text-sm text-muted-foreground md:block">
            <div>Bảo hiểm</div>
            <div>sức khỏe cá nhân</div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <Link
                href="/"
                className="inline-flex h-9 items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:outline-none"
              >
                Giới thiệu
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="cursor-pointer text-sm font-medium text-foreground"
                onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
              >
                Sản phẩm
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[280px] gap-1 p-2">
                  {productItems.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <span
                          className="block cursor-pointer rounded-md p-3 text-sm transition-colors hover:bg-muted"
                          onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
                        >
                          <div className="flex flex-col gap-1">
                            <div className="font-medium leading-none">{item.title}</div>
                            <div className="line-clamp-2 text-xs text-muted-foreground">{item.subtitle}</div>
                          </div>
                        </span>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

                      </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <div className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="cursor-pointer rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] px-6 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(12,59,170,0.25)]"
            onClick={navigateToPlans}
          >
            MUA NGAY
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
              <span className="sr-only">Mở menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              <Link
                href="/"
                className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Giới thiệu
              </Link>

              <div>
                <button
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                >
                  Sản phẩm
                  <ChevronDown className={`size-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileProductsOpen && (
                  <div className="ml-4 flex flex-col gap-1">
                    {productItems.map((item) => (
                      <span
                        key={item.title}
                        className="cursor-pointer rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full rounded-full bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-secondary)] px-6 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(12,59,170,0.25)]"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    navigateToPlans()
                  }}
                >
                  TƯ VẤN NGAY
                </motion.button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
