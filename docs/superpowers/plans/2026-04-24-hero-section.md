# Hero Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a responsive Hero Section component (`components/HeroSection.tsx`) with gradient background, floating illustration, selling points, and CTA buttons, then wire it into the homepage.

**Architecture:** Single React component with absolute-positioned illustration and CSS float animation. Uses existing shadcn Button with `variant="consult"`. No state, no hooks, purely presentational.

**Tech Stack:** React, TypeScript, Tailwind CSS v4, shadcn/ui Button, lucide-react, Next.js

---

## File Structure

| File | Action | Purpose |
|---|---|---|
| `components/HeroSection.tsx` | **Create** | Main hero section component |
| `app/page.tsx` | **Modify** | Import and render `<HeroSection />` |
| `app/globals.css` | **Modify** | Add `@keyframes float` and `.hero-float` class |

---

## Task 1: Add Float Animation CSS

**Files:**
- Modify: `app/globals.css`

**Context:** Tailwind v4 dùng `@theme inline`, không có `tailwind.config`. Custom keyframes thêm vào globals.css sau block `@layer base`.

- [ ] **Step 1: Add float keyframes and hero-float class**

```css
/* ===== HERO ANIMATIONS ===== */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.hero-float {
  animation: float 4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .hero-float {
    animation: none;
  }
}
```

Append đoạn code trên vào **cuối** file `app/globals.css`, sau block `.btn-consult`.

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "$(cat <<'EOF'
feat: add hero float animation keyframes

- Float animation: translateY(-8px), 4s ease-in-out infinite
- Respects prefers-reduced-motion

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Create HeroSection Component

**Files:**
- Create: `components/HeroSection.tsx`

**Context:**
- Dùng `lucide-react` icons: `Shield`, `Heart`, `Handshake`, `ArrowRight`, `Play`
- Dùng `components/ui/button.tsx` — `variant="consult"` đã tồn tại, ghost dùng `variant="ghost"` + custom class để text trắng
- Ảnh: `public/images/early-care-hero-insurance-illustration.png`
- CSS animation class: `hero-float` (đã thêm ở Task 1)

- [ ] **Step 1: Write HeroSection component**

```tsx
import { Shield, Heart, Handshake, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

const sellingPoints = [
  {
    icon: Shield,
    title: "Bảo vệ toàn diện",
    description:
      "Chi trả chi phí khám chữa bệnh, nằm viện, phẫu thuật và hạ thể nữa.",
  },
  {
    icon: Heart,
    title: "Linh hoạt lựa chọn",
    description:
      "Nhiều gói bảo hiểm phù hợp với nhu cầu và ngân sách của bạn.",
  },
  {
    icon: Handshake,
    title: "Dịch vụ tận tâm",
    description: "Hỗ trợ 24/7, giải quyết nhanh chóng và minh bạch.",
  },
]

export function HeroSection() {
  return (
    <section className="relative min-h-[500px] overflow-hidden lg:min-h-[600px]">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, var(--brand-primary), #1e5de0, var(--brand-secondary))",
        }}
      />

      {/* Illustration — desktop absolute right, mobile cropped */}
      <div className="absolute inset-y-0 right-0 hidden w-1/2 md:block lg:w-[45%]">
        <img
          src="/images/early-care-hero-insurance-illustration.png"
          alt="Bảo hiểm sức khỏe"
          className="hero-float h-full w-full object-cover object-left"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[500px] flex-col justify-center py-16 lg:min-h-[600px] lg:py-24">
          {/* Text block — constrained width on desktop */}
          <div className="max-w-xl lg:max-w-[55%]">
            {/* Label */}
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-white/80">
              SẢN PHẨM BẢO HIỂM
            </span>

            {/* Heading */}
            <h1 className="mb-3 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Bảo hiểm
              <br />
              sức khỏe cá nhân
            </h1>

            {/* Subheadline */}
            <p className="mb-8 text-base text-white/90 sm:text-lg">
              Chủ động bảo vệ sức khỏe – An tâm tận hưởng cuộc sống
            </p>

            {/* Selling points */}
            <ul className="mb-8 space-y-4">
              {sellingPoints.map((point) => {
                const Icon = point.icon
                return (
                  <li key={point.title} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/15">
                      <Icon className="h-4 w-4 text-white" />
                    </span>
                    <div>
                      <p className="font-semibold text-white">
                        {point.title}
                      </p>
                      <p className="text-sm text-white/75">
                        {point.description}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>

            {/* CTA buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="consult"
                size="lg"
                className="gap-2 rounded-full px-6 text-sm font-semibold"
              >
                TÌM HIỂU THÊM
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="gap-2 rounded-full border border-white/20 px-6 text-sm font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <Play className="h-4 w-4" fill="white" />
                XEM VIDEO GIỚI THIỆU
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
cd /home/muoi/project/early-care && npx tsc --noEmit --skipLibCheck
```

Expected: No errors related to `HeroSection.tsx`.

- [ ] **Step 3: Commit**

```bash
git add components/HeroSection.tsx
git commit -m "$(cat <<'EOF'
feat: create HeroSection component

- Gradient background with brand colors
- Floating illustration with hero-float animation
- 3 selling points with icons
- CTA buttons: consult + ghost variants
- Responsive: illustration hidden on mobile, crop on tablet

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Wire HeroSection into Homepage

**Files:**
- Modify: `app/page.tsx`

**Context:** File hiện tại chỉ export `null`. Thay bằng render `<HeroSection />`.

- [ ] **Step 1: Import and render HeroSection**

```tsx
import { HeroSection } from "@/components/HeroSection"

export default function Home() {
  return (
    <>
      <HeroSection />
    </>
  )
}
```

Replace toàn bộ nội dung `app/page.tsx` với code trên.

- [ ] **Step 2: Verify build**

```bash
cd /home/muoi/project/early-care && npm run build
```

Expected: Build thành công, không có error liên quan đến HeroSection.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "$(cat <<'EOF'
feat: wire HeroSection into homepage

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

## Spec Coverage Check

| Spec Requirement | Task | Status |
|---|---|---|
| Gradient CSS background (135deg, brand colors) | Task 2, Step 1 | ✅ |
| Illustration as independent element, absolute right | Task 2, Step 1 | ✅ |
| Illustration `object-fit: cover; object-position: left` | Task 2, Step 1 | ✅ |
| Float animation 8px, 4s ease-in-out | Task 1 + Task 2 | ✅ |
| `prefers-reduced-motion: reduce` disables animation | Task 1, Step 1 | ✅ |
| Mobile: illustration hidden (`hidden md:block`) | Task 2, Step 1 | ✅ |
| Content: label, heading, subheadline | Task 2, Step 1 | ✅ |
| 3 selling points with icons | Task 2, Step 1 | ✅ |
| CTA: "TÌM HIỂU THÊM" + "XEM VIDEO GIỚI THIỆU" | Task 2, Step 1 | ✅ |
| `variant="consult"` cho primary CTA | Task 2, Step 1 | ✅ |
| Wire into `app/page.tsx` | Task 3 | ✅ |

---

## Plan Self-Review

1. **Placeholder scan:** Không có TBD, TODO, incomplete sections.
2. **Type consistency:** `HeroSection` export named function, import đúng pattern `@/components/HeroSection`.
3. **Tailwind v4 compatibility:** Dùng `size-*` utilities, không dùng `width`/`height` riêng. `bg-white/15` syntax hợp lệ.
4. **No placeholders:** Mỗi step có code đầy đủ, commands cụ thể.
