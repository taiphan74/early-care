type PlansNavigatorOptions = {
  getPathname: () => string
  push: (href: string) => void
  scrollToPlans: () => void
}

export function createPlansNavigator({ getPathname, push, scrollToPlans }: PlansNavigatorOptions) {
  return function navigateToPlans() {
    if (getPathname() === "/") {
      scrollToPlans()
      return
    }

    push("/#plans")
  }
}
