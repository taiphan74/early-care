import assert from "node:assert/strict"
import test from "node:test"
import * as healthDeclaration from "../app/application/health-declaration.mjs"

test("question 5 details are informational items without separate answers", () => {
  assert.equal(healthDeclaration.questionFiveDetails.length, 5)
  assert.equal("getNextQuestionFiveDetailAnswers" in healthDeclaration, false)
})
