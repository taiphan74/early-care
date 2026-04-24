# Hero Section Design — Early Care Insurance Landing Page

## Overview

Tạo component Hero Section cho trang landing page bảo hiểm sức khỏe cá nhân "Early Care". Section nằm ngay dưới Header, sử dụng gradient xanh CSS làm nền chính với ảnh illustration 3D đặt làm element độc lập bên phải, có animation float nhẹ.

## Decision Log

| Decision | Chosen | Rationale |
|---|---|---|
| Background approach | **B — CSS Gradient + ảnh illustration độc lập** | Kiểm soát màu sắc tốt hơn, responsive linh hoạt, dễ thay đổi nội dung |
| Gradient complexity | **A — Gradient đơn giản** | Code đơn giản, ít bug responsive, dễ maintain |
| Animation | **C — Float nhẹ 6-10px** | Thu hút mắt, không gây phân tâm, respect `prefers-reduced-motion` |
| Mobile illustration | **A — Crop bên phải, giữ phần trái** | Shield/clipboard icons vẫn hiện, text đọc tốt |

## Component Structure

```
HeroSection
├── <section> — root, relative, overflow-hidden, min-h-[500px] lg:min-h-[600px]
│   ├── <div> — gradient background (absolute, inset-0)
│   │   └── linear-gradient(135deg, #0C3BAA, #1e5de0, #3B82F6)
│   ├── <div> — illustration container (absolute, right-0, top-0, h-full)
│   │   └── <img> — early-care-hero-insurance-illustration.png
│   │       └── object-fit: cover; object-position: left;
│   └── <div> — content wrapper, max-w-7xl, mx-auto, relative z-10
│       ├── <div> — left column, py-16 lg:py-24
│       │   ├── <span> — "SẢN PHẨM BẢO HIỂM" (label uppercase)
│       │   ├── <h1> — "Bảo hiểm sức khỏe cá nhân"
│       │   ├── <p> — "Chủ động bảo vệ sức khỏe – An tâm tận hưởng cuộc sống"
│       │   ├── <ul> — 3 selling points
│       │   │   └── each: <div> icon + title + description
│       │   └── <div> — CTA buttons row (flex, gap-4)
│       │       ├── <Button variant="consult"> — "TÌM HIỂU THÊM" + ArrowRight
│       │       └── <Button variant="ghost"> — "XEM VIDEO GIỚI THIỆU" + Play
│       └── <div> — right column (invisible spacer on desktop, hidden on mobile)
```

## Responsive Breakpoints

| Breakpoint | Layout | Illustration |
|---|---|---|
| **Desktop (≥1024px)** | 2 cột: text ~55%, illustration ~45% | `object-position: left`, visible, animated |
| **Tablet (768-1023px)** | 2 cột: text ~60%, illustration ~40% | `object-position: left`, scale down |
| **Mobile (<768px)** | 1 cột text-centered | `overflow: hidden`, crop right 50%, chỉ hiện shield/clipboard |

## Animation Spec

```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.hero-illustration {
  animation: float 4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .hero-illustration {
    animation: none;
  }
}
```

**Constraints:**
- Chỉ animate ảnh illustration (1 element duy nhất)
- Không animate text, icons, buttons
- Không rotate, scale, shake
- Duration: 4s — chậm, nhẹ nhàng
- Tắt hoàn toàn khi `prefers-reduced-motion: reduce`

## Content

### Label
`SẢN PHẨM BẢO HIỂM`

### Heading
`Bảo hiểm sức khỏe cá nhân`

### Subheadline
`Chủ động bảo vệ sức khỏe – An tâm tận hưởng cuộc sống`

### Selling Points

| # | Icon | Title | Description |
|---|---|---|---|
| 1 | Shield | Bảo vệ toàn diện | Chi trả chi phí khám chữa bệnh, nằm viện, phẫu thuật và hạ thể nữa. |
| 2 | Heart | Linh hoạt lựa chọn | Nhiều gói bảo hiểm phù hợp với nhu cầu và ngân sách của bạn. |
| 3 | Handshake | Dịch vụ tận tâm | Hỗ trợ 24/7, giải quyết nhanh chóng và minh bạch. |

### CTA Buttons

| Button | Text | Variant | Icon |
|---|---|---|---|
| Primary | TÌM HIỂU THÊM | `consult` | ArrowRight |
| Secondary | XEM VIDEO GIỚI THIỆU | `ghost` (white text, transparent bg) | Play |

## Assets

| Asset | Path | Usage |
|---|---|---|
| Hero illustration | `public/images/early-care-hero-insurance-illustration.png` | Main visual, absolute positioned right |

## Styling Tokens

| Token | Value | Usage |
|---|---|---|
| `--brand-primary` | `#0C3BAA` | Gradient start |
| `--brand-secondary` | `#3B82F6` | Gradient end |
| Gradient direction | `135deg` | Từ trái-xanh đậm → phải-xanh nhạt |
| Text color | `white` | Tất cả text trên hero |
| Icon bg | `rgba(255,255,255,0.15)` | Nền icon selling points |
| Section min-height | `500px` mobile, `600px` desktop | |

## Accessibility

- `prefers-reduced-motion: reduce` → tắt float animation
- Text đủ contrast trên gradient (trắng trên xanh đậm)
- Heading `h1` duy nhất trong page
- CTA buttons focusable, có focus ring

## Dependencies

- `lucide-react` — icons: `Shield`, `Heart`, `Handshake` (hoặc `Users`), `ArrowRight`, `Play`
- `components/ui/button.tsx` — shadcn Button với `variant="consult"`
