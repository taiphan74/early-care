import assert from "node:assert/strict"
import test from "node:test"
import { createPlansNavigator } from "../components/header-navigation.mjs"

test("header CTA scrolls to plans when already on landing page", () => {
  let pushedTo = null
  let scrolled = false

  const navigateToPlans = createPlansNavigator({
    getPathname: () => "/",
    push: (href) => {
      pushedTo = href
    },
    scrollToPlans: () => {
      scrolled = true
    },
  })

  navigateToPlans()

  assert.equal(scrolled, true)
  assert.equal(pushedTo, null)
})

test("header CTA navigates to landing plans anchor from other pages", () => {
  let pushedTo = null
  let scrolled = false

  const navigateToPlans = createPlansNavigator({
    getPathname: () => "/application",
    push: (href) => {
      pushedTo = href
    },
    scrollToPlans: () => {
      scrolled = true
    },
  })

  navigateToPlans()

  assert.equal(pushedTo, "/#plans")
  assert.equal(scrolled, false)
})
