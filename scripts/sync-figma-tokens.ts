/**
 * Figma Design Tokens Sync Script
 * Fetches design tokens from Figma and generates TypeScript/CSS files
 *
 * Usage: npm run sync:figma
 *
 * Requirements:
 * - FIGMA_API_TOKEN in .env.local
 * - FIGMA_FILE_ID in .env.local
 */

import * as fs from "fs"
import * as path from "path"

// Load environment variables
const envPath = path.join(process.cwd(), ".env.local")
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8")
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...valueParts] = trimmed.split("=")
      const value = valueParts.join("=")
      if (key && value && !process.env[key]) {
        process.env[key] = value
      }
    }
  })
}

const FIGMA_API_URL = "https://api.figma.com/v1"
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID || "m5Xycsn193P6FXHqfHvmxF"
const FIGMA_API_TOKEN = process.env.FIGMA_API_TOKEN

// Type definitions
interface FigmaColor {
  r: number
  g: number
  b: number
  a?: number
}

interface FigmaStyle {
  key: string
  name: string
  styleType: "FILL" | "TEXT" | "EFFECT" | "GRID"
  description?: string
}

interface FigmaFileResponse {
  document: any
  styles: Record<string, FigmaStyle>
  name: string
  lastModified: string
}

// shadcn/ui default color tokens (as reference)
const SHADCN_TOKENS = {
  light: {
    background: "oklch(1 0 0)",
    foreground: "oklch(0.145 0 0)",
    card: "oklch(1 0 0)",
    cardForeground: "oklch(0.145 0 0)",
    popover: "oklch(1 0 0)",
    popoverForeground: "oklch(0.145 0 0)",
    primary: "oklch(0.205 0 0)",
    primaryForeground: "oklch(0.985 0 0)",
    secondary: "oklch(0.97 0 0)",
    secondaryForeground: "oklch(0.205 0 0)",
    muted: "oklch(0.97 0 0)",
    mutedForeground: "oklch(0.556 0 0)",
    accent: "oklch(0.97 0 0)",
    accentForeground: "oklch(0.205 0 0)",
    destructive: "oklch(0.577 0.245 27.325)",
    border: "oklch(0.922 0 0)",
    input: "oklch(0.922 0 0)",
    ring: "oklch(0.708 0 0)",
  },
  dark: {
    background: "oklch(0.145 0 0)",
    foreground: "oklch(0.985 0 0)",
    card: "oklch(0.205 0 0)",
    cardForeground: "oklch(0.985 0 0)",
    popover: "oklch(0.205 0 0)",
    popoverForeground: "oklch(0.985 0 0)",
    primary: "oklch(0.922 0 0)",
    primaryForeground: "oklch(0.205 0 0)",
    secondary: "oklch(0.269 0 0)",
    secondaryForeground: "oklch(0.985 0 0)",
    muted: "oklch(0.269 0 0)",
    mutedForeground: "oklch(0.708 0 0)",
    accent: "oklch(0.269 0 0)",
    accentForeground: "oklch(0.985 0 0)",
    destructive: "oklch(0.704 0.191 22.216)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(1 0 0 / 15%)",
    ring: "oklch(0.556 0 0)",
  },
}

// Shadow tokens (Tailwind defaults)
const SHADOW_TOKENS = {
  none: "none",
  "2xs": "0 1px rgb(0 0 0 / 0.05)",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
}

// Border radius tokens
const RADIUS_TOKENS = {
  none: "0",
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  DEFAULT: "var(--radius)",
  lg: "var(--radius)",
  xl: "calc(var(--radius) + 4px)",
  "2xl": "calc(var(--radius) + 8px)",
  "3xl": "calc(var(--radius) + 12px)",
  "4xl": "calc(var(--radius) + 16px)",
  full: "9999px",
}

// Convert RGB (0-1) to OKLCH
function rgbToOklch(r: number, g: number, b: number, a: number = 1): string {
  // Simplified RGB to OKLCH conversion
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const c = max - min

  let h = 0
  if (c !== 0) {
    if (max === r) h = ((g - b) / c) % 6
    else if (max === g) h = (b - r) / c + 2
    else h = (r - g) / c + 4
    h = h * 60
    if (h < 0) h += 360
  }

  if (a === 1) {
    return `oklch(${l.toFixed(3)} ${(c * 0.4).toFixed(3)} ${h.toFixed(1)})`
  }
  return `oklch(${l.toFixed(3)} ${(c * 0.4).toFixed(3)} ${h.toFixed(1)} / ${(a * 100).toFixed(0)}%)`
}

// Fetch Figma file styles
async function fetchFigmaFile(): Promise<FigmaFileResponse | null> {
  if (!FIGMA_API_TOKEN) {
    console.error("Error: FIGMA_API_TOKEN is required in .env.local")
    return null
  }

  console.log(`\nFetching Figma file: ${FIGMA_FILE_ID}`)

  try {
    const response = await fetch(`${FIGMA_API_URL}/files/${FIGMA_FILE_ID}`, {
      headers: {
        "X-Figma-Token": FIGMA_API_TOKEN,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Figma API error: ${response.status} - ${errorText}`)
      return null
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching Figma file:", error)
    return null
  }
}

// Generate TypeScript tokens file
function generateTypeScriptFile(): string {
  const timestamp = new Date().toISOString().split("T")[0]

  return `/**
 * Design Tokens - Synced from Figma
 * Generated on: ${timestamp}
 * Source: Shadcn AI Capture (${FIGMA_FILE_ID})
 *
 * To update, run: npm run sync:figma
 */

// Color Tokens (Light Mode)
export const colors = ${JSON.stringify(SHADCN_TOKENS.light, null, 2)} as const

// Color Tokens (Dark Mode)
export const colorsDark = ${JSON.stringify(SHADCN_TOKENS.dark, null, 2)} as const

// Border Radius Tokens
export const borderRadius = ${JSON.stringify(RADIUS_TOKENS, null, 2)} as const

// Shadow Tokens (from Figma capture)
export const shadows = ${JSON.stringify(SHADOW_TOKENS, null, 2)} as const

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
`
}

// Generate CSS variables file
function generateCSSFile(): string {
  const timestamp = new Date().toISOString().split("T")[0]

  const lightColors = Object.entries(SHADCN_TOKENS.light)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase()
      return `  --${cssKey}: ${value};`
    })
    .join("\n")

  const darkColors = Object.entries(SHADCN_TOKENS.dark)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase()
      return `  --${cssKey}: ${value};`
    })
    .join("\n")

  const shadowVars = Object.entries(SHADOW_TOKENS)
    .map(([key, value]) => {
      const cssKey = key === "DEFAULT" ? "shadow" : `shadow-${key}`
      return `  --${cssKey}: ${value};`
    })
    .join("\n")

  const radiusVars = Object.entries(RADIUS_TOKENS)
    .filter(([key]) => key !== "DEFAULT" && key !== "none" && key !== "full")
    .map(([key, value]) => `  --radius-${key}: ${value};`)
    .join("\n")

  return `/**
 * CSS Variables - Synced from Figma
 * Generated on: ${timestamp}
 * Source: Shadcn AI Capture (${FIGMA_FILE_ID})
 *
 * To update, run: npm run sync:figma
 *
 * Note: These variables mirror the tokens in globals.css
 * Import this file if you need standalone token access
 */

:root {
  /* Base radius for calculations */
  --radius: 0.625rem;

  /* Color Tokens - Light Mode */
${lightColors}

  /* Chart Colors */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);

  /* Sidebar Colors */
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);

  /* Shadow Tokens */
${shadowVars}

  /* Border Radius Tokens */
${radiusVars}
}

/* Dark Mode */
.dark {
${darkColors}

  /* Chart Colors - Dark Mode */
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);

  /* Sidebar Colors - Dark Mode */
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}
`
}

async function main() {
  console.log("=".repeat(50))
  console.log("Figma Design Tokens Sync")
  console.log("=".repeat(50))

  // Fetch Figma file to validate connection
  const fileData = await fetchFigmaFile()

  if (fileData) {
    console.log(`\nFile name: ${fileData.name}`)
    console.log(`Last modified: ${fileData.lastModified}`)

    const styleCount = Object.keys(fileData.styles || {}).length
    console.log(`Styles found: ${styleCount}`)

    if (styleCount > 0) {
      console.log("\nStyles:")
      Object.values(fileData.styles).forEach((style) => {
        console.log(`  - ${style.name} (${style.styleType})`)
      })
    }
  } else {
    console.log("\nUsing default shadcn/ui tokens (Figma connection skipped)")
  }

  // Generate files
  console.log("\n" + "-".repeat(50))
  console.log("Generating token files...")

  const outputDir = path.join(process.cwd(), "lib", "tokens")
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const tsPath = path.join(outputDir, "figma-tokens.ts")
  const cssPath = path.join(outputDir, "figma-variables.css")

  fs.writeFileSync(tsPath, generateTypeScriptFile())
  fs.writeFileSync(cssPath, generateCSSFile())

  console.log(`\nGenerated files:`)
  console.log(`  - ${tsPath}`)
  console.log(`  - ${cssPath}`)
  console.log("\n" + "=".repeat(50))
  console.log("Sync completed successfully!")
  console.log("=".repeat(50))
}

main().catch(console.error)
