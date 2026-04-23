"use client"

import * as React from "react"
import Link from "next/link"
import { useState } from "react"
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
  { title: "Bảo hiểm cơ bản", href: "/san-pham/co-ban", description: "Gói bảo hiểm sức khỏe cơ bản" },
  { title: "Bảo hiểm nâng cao", href: "/san-pham/nang-cao", description: "Gói bảo hiểm toàn diện" },
  { title: "Bảo hiểm gia đình", href: "/san-pham/gia-dinh", description: "Bảo vệ cả gia đình" },
]

const blogItems = [
  { title: "Tin tức", href: "/blog/tin-tuc" },
  { title: "Kiến thức sức khỏe", href: "/blog/kien-thuc" },
  { title: "Hướng dẫn", href: "/blog/huong-dan" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false)

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
              <NavigationMenuLink asChild>
                <Link
                  href="/gioi-thieu"
                  className="inline-flex h-9 items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:outline-none"
                >
                  Giới thiệu
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium text-foreground">
                Sản phẩm
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[280px] gap-1 p-2">
                  {productItems.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="block rounded-md p-3 text-sm transition-colors hover:bg-muted"
                        >
                          <div className="font-medium text-foreground">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium text-foreground">
                Blog
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-1 p-2">
                  {blogItems.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          className="block rounded-md p-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/lien-he"
                  className="inline-flex h-9 items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:outline-none"
                >
                  Liên hệ
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button variant="consult" size="lg" className="px-6">
            TƯ VẤN NGAY
          </Button>
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
                href="/gioi-thieu"
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Giới thiệu
              </Link>

              <div>
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                >
                  Sản phẩm
                  <ChevronDown className={`size-4 transition-transform ${mobileProductsOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileProductsOpen && (
                  <div className="ml-4 flex flex-col gap-1">
                    {productItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileBlogOpen(!mobileBlogOpen)}
                >
                  Blog
                  <ChevronDown className={`size-4 transition-transform ${mobileBlogOpen ? "rotate-180" : ""}`} />
                </button>
                {mobileBlogOpen && (
                  <div className="ml-4 flex flex-col gap-1">
                    {blogItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/lien-he"
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                Liên hệ
              </Link>

              <div className="mt-4 pt-4 border-t">
                <Button variant="consult" className="w-full">
                  TƯ VẤN NGAY
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
