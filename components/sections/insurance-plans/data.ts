export const plans = [
  {
    id: "basic",
    name: "Gói cơ bản",
    tagline: "Bảo vệ thiết yếu, chi phí hợp lý",
    coverageAmount: "250.000.000đ",
    price: "1.000.000đ",
    pricePeriod: "/năm",
    features: [
      { label: "Quyền lợi bệnh Ung thư", value: "Tối đa 70% STBH", icon: "shield" },
      { label: "Trợ cấp nằm viện", value: "0.2%/ngày (tối đa 30 ngày/năm)", icon: "bed" },
      { label: "Tầm soát ung thư", value: "50% chi phí khám (tối đa 3.000.000đ)", icon: "search" },
      { label: "Tử vong do Ung thư", value: "5% STBH", icon: "heart" },
      { label: "Early Detection Bonus", value: "+5% STBH", icon: "gift" },
    ],
    cta: "CHỌN GÓI CƠ BẢN",
    highlighted: false,
  },
  {
    id: "premium",
    name: "Gói nâng cao",
    tagline: "Bảo vệ tối ưu, cân bằng chi phí",
    coverageAmount: "500.000.000đ",
    price: "2.100.000đ",
    pricePeriod: "/năm",
    badge: "PHỔ BIẾN NHẤT",
    features: [
      { label: "Quyền lợi bệnh Ung thư", value: "Tối đa 70% STBH", icon: "shield" },
      { label: "Trợ cấp nằm viện", value: "0.2%/ngày (tối đa 30 ngày/năm)", icon: "bed" },
      { label: "Tầm soát ung thư", value: "50% chi phí khám (tối đa 6.000.000đ)", icon: "search" },
      { label: "Tử vong do Ung thư", value: "5% STBH", icon: "heart" },
      { label: "Early Detection Bonus", value: "+6% STBH", icon: "gift" },
      { label: "Đặc quyền", value: "Đặt lịch khám ưu tiên", icon: "plus" },
    ],
    cta: "CHỌN GÓI NÂNG CAO",
    highlighted: true,
  },
  {
    id: "advanced",
    name: "Gói toàn diện",
    tagline: "Bảo vệ toàn diện, an tâm tuyệt đối",
    coverageAmount: "1.000.000.000đ",
    price: "4.300.000đ",
    pricePeriod: "/năm",
    features: [
      { label: "Quyền lợi bệnh Ung thư", value: "Tối đa 100% STBH", icon: "shield" },
      { label: "Trợ cấp nằm viện", value: "0.2%/ngày (tối đa 30 ngày/năm)", icon: "bed" },
      { label: "Tầm soát ung thư", value: "50% chi phí khám (tối đa 10.000.000đ)", icon: "search" },
      { label: "Tử vong do Ung thư", value: "5% STBH", icon: "heart" },
      { label: "Early Detection Bonus", value: "+8% STBH", icon: "gift" },
      { label: "Đặc quyền", value: "Đặt lịch khám ưu tiên", icon: "plus" },
    ],
    cta: "CHỌN GÓI TOÀN DIỆN",
    highlighted: false,
  },
] as const

export const bottomFeatures = [
  {
    icon: "shield-check",
    title: "Bảo vệ toàn diện",
    description: "Chi trả theo từng giai đoạn ung thư, hỗ trợ tối đa",
  },
  {
    icon: "building",
    title: "Chi trả linh hoạt",
    description: "Quyền lợi đa dạng, chi trả nhanh chóng, minh bạch",
  },
  {
    icon: "user-group",
    title: "Tư vấn tận tâm",
    description: "Đội ngũ chuyên gia đồng hành 24/7 cùng bạn và gia đình",
  },
  {
    icon: "clipboard-check",
    title: "Thủ tục đơn giản",
    description: "Tham gia dễ dàng, quản lý hợp đồng trực tuyến",
  },
] as const

export type Plan = (typeof plans)[number]
