import assert from "node:assert/strict"
import test from "node:test"
import { formatFileSize, validateClaimForm } from "../app/claim/claim-form.mjs"

test("formatFileSize formats bytes under 1MB as KB", () => {
  assert.equal(formatFileSize(512_000), "500 KB")
})

test("formatFileSize formats bytes at or above 1MB as MB", () => {
  assert.equal(formatFileSize(1_572_864), "1.5 MB")
})

test("validateClaimForm requires at least one document", () => {
  const result = validateClaimForm({
    fileCount: 0,
    bankName: "Vietcombank",
    accountNumber: "123456789",
    accountHolder: "NGUYEN VAN A",
  })

  assert.equal(result.valid, false)
  assert.equal(result.errors.documents, "Vui lòng đính kèm ít nhất một tài liệu.")
})

test("validateClaimForm requires all bank fields", () => {
  const result = validateClaimForm({
    fileCount: 1,
    bankName: "",
    accountNumber: "",
    accountHolder: "",
  })

  assert.equal(result.valid, false)
  assert.equal(result.errors.bankName, "Vui lòng nhập ngân hàng.")
  assert.equal(result.errors.accountNumber, "Vui lòng nhập số tài khoản hoặc số thẻ.")
  assert.equal(result.errors.accountHolder, "Vui lòng nhập chủ tài khoản.")
})

test("validateClaimForm trims values before validating", () => {
  const result = validateClaimForm({
    fileCount: 1,
    bankName: "  Techcombank  ",
    accountNumber: "  190366668888  ",
    accountHolder: "  NGUYEN VAN A  ",
  })

  assert.equal(result.valid, true)
  assert.deepEqual(result.errors, {})
})
