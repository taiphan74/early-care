export type PaymentMethodKey = "qr" | "card" | "wallet"

export type PaymentMethod = {
  key: PaymentMethodKey
  label: string
  description: string
}

export type PaymentApp = {
  id: string
  label: string
  shortLabel: string
  logo?: string
}

export type OrderSummary = {
  productLabel: string
  productName: string
  packageLabel: string
  coverageAmountLabel: string
  coverageAmountValue: string
  premiumLabel: string
  premiumValue: string
  termLabel: string
  termValue: string
  effectiveDateLabel: string
  effectiveDateValue: string
  totalLabel: string
  totalValue: string
  vatLabel: string
}

export type SecurityItem = {
  id: string
  label: string
}

export const paymentMethods: PaymentMethod[] = [
  {
    key: "qr",
    label: "Mã QR",
    description: "Quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử để thanh toán.",
  },
  {
    key: "card",
    label: "Thẻ ngân hàng",
    description: "Thanh toán bằng thẻ nội địa hoặc thẻ quốc tế đã liên kết.",
  },
  {
    key: "wallet",
    label: "Ví điện tử",
    description: "Chọn ví điện tử phù hợp để hoàn tất thanh toán nhanh chóng.",
  },
]

export const bankTransferDetails = {
  bankNameLabel: "Ngân hàng thụ hưởng",
  bankNameValue: "ACB - Ngân hàng Á Châu",
  accountNumberLabel: "Số tài khoản",
  accountNumberValue: "1234 5678 9012",
  accountHolderLabel: "Tên tài khoản",
  accountHolderValue: "EARLY CARE INSURANCE",
  amountLabel: "Số tiền",
  amountValue: "2.100.000 VND",
  referenceLabel: "Nội dung chuyển khoản",
  referenceValue: "EC241120240001",
}

export const bankApps: PaymentApp[] = [
  {
    id: "vietcombank",
    label: "Vietcombank",
    shortLabel: "VCB",
    logo: "https://api.vietqr.io/img/VCB.png",
  },
  {
    id: "bidv",
    label: "BIDV",
    shortLabel: "BIDV",
    logo: "https://api.vietqr.io/img/BIDV.png",
  },
  {
    id: "acb",
    label: "ACB",
    shortLabel: "ACB",
    logo: "https://api.vietqr.io/img/ACB.png",
  },
  {
    id: "mb",
    label: "MB Bank",
    shortLabel: "MB",
    logo: "https://api.vietqr.io/img/MB.png",
  },
]

export const walletApps: PaymentApp[] = [
  {
    id: "momo",
    label: "MoMo",
    shortLabel: "MoMo",
    logo: "/images/wallet-momo.svg",
  },
  {
    id: "zalopay",
    label: "ZaloPay",
    shortLabel: "ZaloPay",
    logo: "/images/wallet-zalopay.svg",
  },
  {
    id: "vnpay",
    label: "VNPay",
    shortLabel: "VNPay",
    logo: "/images/wallet-vnpay.svg",
  },
  {
    id: "shopeepay",
    label: "ShopeePay",
    shortLabel: "SPay",
    logo: "/images/wallet-shopeepay.png",
  },
]

export const orderSummary: OrderSummary = {
  productLabel: "Sản phẩm",
  productName: "Bảo hiểm Ung thư Chủ động Early Care",
  packageLabel: "Gói nâng cao",
  coverageAmountLabel: "Số tiền bảo hiểm",
  coverageAmountValue: "500.000.000 VND",
  premiumLabel: "Phí bảo hiểm",
  premiumValue: "2.100.000 VND",
  termLabel: "Thời hạn bảo hiểm",
  termValue: "1 năm",
  effectiveDateLabel: "Ngày hiệu lực",
  effectiveDateValue: "21/11/2024",
  totalLabel: "Tổng thanh toán",
  totalValue: "2.100.000 VND",
  vatLabel: "(Đã bao gồm VAT)",
}

export const benefits = [
  "Chi trả ung thư từ giai đoạn 0 đến giai đoạn trễ",
  "Trợ cấp nằm viện 0,2%/ngày (tối đa 30 ngày/năm)",
  "Hỗ trợ chi phí tầm soát ung thư hàng năm",
  "Tư vấn sức khỏe định kỳ miễn phí",
  "Quy trình bồi thường nhanh chóng, minh bạch",
]

export const securityItems: SecurityItem[] = [
  { id: "private", label: "Bảo mật tuyệt đối" },
  { id: "secure", label: "Thanh toán an toàn" },
  { id: "instant", label: "Xác nhận tức thì" },
]

export const paymentNotice = {
  title: "Vui lòng hoàn tất thanh toán trong 15:00 phút",
  description: "Để đảm bảo đơn hàng được giữ hiệu lực.",
}

