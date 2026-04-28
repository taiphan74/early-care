export function createPlansNavigator({ getPathname, push, scrollToPlans }) {
  return function navigateToPlans() {
    if (getPathname() === "/") {
      scrollToPlans()
      return
    }

    push("/#plans")
  }
}
