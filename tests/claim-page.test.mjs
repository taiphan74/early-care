import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"

const completedPage = readFileSync(new URL("../app/completed/page.tsx", import.meta.url), "utf8")

test("completed page links to claim instructions with a red compensation button", () => {
  assert.match(completedPage, /href="\/claim"/)
  assert.match(completedPage, /Bồi thường/)
  assert.match(completedPage, /bg-red-600/)
})

test("claim page renders the compensation instruction image", () => {
  const claimPagePath = new URL("../app/claim/page.tsx", import.meta.url)
  const claimImagePath = new URL("../public/images/claim-compensation-guide.png", import.meta.url)

  assert.equal(existsSync(claimPagePath), true)
  assert.equal(existsSync(claimImagePath), true)

  const claimPage = readFileSync(claimPagePath, "utf8")
  assert.match(claimPage, /claim-compensation-guide\.png/)
  assert.match(claimPage, /Quy trình bồi thường/)
})

test("claim page keeps the guide inside the viewport-height section", () => {
  const claimPage = readFileSync(new URL("../app/claim/page.tsx", import.meta.url), "utf8")

  assert.match(claimPage, /h-\[calc\(100vh-65px\)\]/)
  assert.match(claimPage, /object-contain/)
})
