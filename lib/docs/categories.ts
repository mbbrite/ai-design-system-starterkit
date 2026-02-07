export const componentCategories = {
  Layout: ["aspect-ratio", "card", "scroll-area", "separator"],
  Forms: [
    "button",
    "checkbox",
    "form",
    "input",
    "input-otp",
    "label",
    "radio-group",
    "select",
    "slider",
    "switch",
    "textarea",
    "toggle",
    "toggle-group",
  ],
  "Data Display": [
    "avatar",
    "badge",
    "calendar",
    "carousel",
    "progress",
    "skeleton",
    "table",
  ],
  Feedback: ["alert", "alert-dialog", "sonner", "tooltip"],
  Navigation: [
    "breadcrumb",
    "command",
    "dropdown-menu",
    "menubar",
    "navigation-menu",
    "pagination",
    "tabs",
  ],
  Overlay: [
    "context-menu",
    "dialog",
    "drawer",
    "hover-card",
    "popover",
    "sheet",
  ],
  Disclosure: ["accordion", "collapsible"],
} as const

export type ComponentCategory = keyof typeof componentCategories

export function formatComponentName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function getComponentCategory(slug: string): string[] {
  const categories: string[] = []
  for (const [category, components] of Object.entries(componentCategories)) {
    if (components.includes(slug as never)) {
      categories.push(category)
    }
  }
  return categories
}

export const allComponentSlugs: string[] = Object.values(componentCategories).flat()
