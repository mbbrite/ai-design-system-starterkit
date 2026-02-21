/**
 * Design Tokens - Synced from Figma
 * Generated on: 2026-02-21
 * Source: Shadcn AI Capture (m5Xycsn193P6FXHqfHvmxF)
 *
 * To update, run: npm run sync:figma
 */

// Color Tokens (Light Mode)
export const colors = {
  "background": "oklch(1 0 0)",
  "foreground": "oklch(0.145 0 0)",
  "card": "oklch(1 0 0)",
  "cardForeground": "oklch(0.145 0 0)",
  "popover": "oklch(1 0 0)",
  "popoverForeground": "oklch(0.145 0 0)",
  "primary": "oklch(0.205 0 0)",
  "primaryForeground": "oklch(0.985 0 0)",
  "secondary": "oklch(0.97 0 0)",
  "secondaryForeground": "oklch(0.205 0 0)",
  "muted": "oklch(0.97 0 0)",
  "mutedForeground": "oklch(0.556 0 0)",
  "accent": "oklch(0.97 0 0)",
  "accentForeground": "oklch(0.205 0 0)",
  "destructive": "oklch(0.577 0.245 27.325)",
  "border": "oklch(0.922 0 0)",
  "input": "oklch(0.922 0 0)",
  "ring": "oklch(0.708 0 0)"
} as const

// Color Tokens (Dark Mode)
export const colorsDark = {
  "background": "oklch(0.145 0 0)",
  "foreground": "oklch(0.985 0 0)",
  "card": "oklch(0.205 0 0)",
  "cardForeground": "oklch(0.985 0 0)",
  "popover": "oklch(0.205 0 0)",
  "popoverForeground": "oklch(0.985 0 0)",
  "primary": "oklch(0.922 0 0)",
  "primaryForeground": "oklch(0.205 0 0)",
  "secondary": "oklch(0.269 0 0)",
  "secondaryForeground": "oklch(0.985 0 0)",
  "muted": "oklch(0.269 0 0)",
  "mutedForeground": "oklch(0.708 0 0)",
  "accent": "oklch(0.269 0 0)",
  "accentForeground": "oklch(0.985 0 0)",
  "destructive": "oklch(0.704 0.191 22.216)",
  "border": "oklch(1 0 0 / 10%)",
  "input": "oklch(1 0 0 / 15%)",
  "ring": "oklch(0.556 0 0)"
} as const

// Border Radius Tokens
export const borderRadius = {
  "none": "0",
  "sm": "calc(var(--radius) - 4px)",
  "md": "calc(var(--radius) - 2px)",
  "DEFAULT": "var(--radius)",
  "lg": "var(--radius)",
  "xl": "calc(var(--radius) + 4px)",
  "2xl": "calc(var(--radius) + 8px)",
  "3xl": "calc(var(--radius) + 12px)",
  "4xl": "calc(var(--radius) + 16px)",
  "full": "9999px"
} as const

// Shadow Tokens (from Figma capture)
export const shadows = {
  "none": "none",
  "2xs": "0 1px rgb(0 0 0 / 0.05)",
  "xs": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "sm": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "DEFAULT": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "md": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  "inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)"
} as const

// Typography Tokens
export const typography = {
  fontFamily: {
    sans: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
  },
  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },
} as const

// Spacing Tokens (Tailwind default scale)
export const spacing = {
  px: "1px",
  0: "0",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  2.5: "0.625rem",
  3: "0.75rem",
  3.5: "0.875rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  7: "1.75rem",
  8: "2rem",
  9: "2.25rem",
  10: "2.5rem",
  11: "2.75rem",
  12: "3rem",
  14: "3.5rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  28: "7rem",
  32: "8rem",
  36: "9rem",
  40: "10rem",
  44: "11rem",
  48: "12rem",
} as const

// All tokens combined
export const figmaTokens = {
  colors,
  colorsDark,
  borderRadius,
  shadows,
  typography,
  spacing,
} as const

export default figmaTokens
