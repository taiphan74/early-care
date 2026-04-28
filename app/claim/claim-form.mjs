export function formatFileSize(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${Number((bytes / 1024 / 1024).toFixed(1))} MB`
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

export function validateClaimForm(fields) {
  const errors = {}

  if (fields.fileCount < 1) {
    errors.documents = "Vui lòng đính kèm ít nhất một tài liệu."
  }

  if (!fields.bankName.trim()) {
    errors.bankName = "Vui lòng nhập ngân hàng."
  }

  if (!fields.accountNumber.trim()) {
    errors.accountNumber = "Vui lòng nhập số tài khoản hoặc số thẻ."
  }

  if (!fields.accountHolder.trim()) {
    errors.accountHolder = "Vui lòng nhập chủ tài khoản."
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}
