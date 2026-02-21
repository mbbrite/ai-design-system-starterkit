/**
 * Figma Variables Sync Script
 * Fetches design tokens from Figma Variables API and generates TypeScript/CSS files
 *
 * Usage: npx ts-node scripts/sync-figma-tokens.ts
 * Or: npm run sync:figma
 */

import * as fs from "fs"
import * as path from "path"

// Load environment variables from .env.local
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
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID || "Cxi3IPoAMdhGTLagGa4k0B"
const FIGMA_API_TOKEN = process.env.FIGMA_API_TOKEN

interface FigmaVariable {
  id: string
  name: string
  key: string
  variableCollectionId: string
  resolvedType: "BOOLEAN" | "FLOAT" | "STRING" | "COLOR"
  valuesByMode: Record<string, FigmaVariableValue>
  remote: boolean
  description: string
  hiddenFromPublishing: boolean
  scopes: string[]
  codeSyntax: Record<string, string>
}

interface FigmaVariableValue {
  type?: string
  id?: string
  r?: number
  g?: number
  b?: number
  a?: number
}

interface FigmaVariableCollection {
  id: string
  name: string
  key: string
  modes: { modeId: string; name: string }[]
  defaultModeId: string
  remote: boolean
  hiddenFromPublishing: boolean
  variableIds: string[]
}

interface FigmaVariablesResponse {
  status: number
  error: boolean
  meta: {
    variableCollections: Record<string, FigmaVariableCollection>
    variables: Record<string, FigmaVariable>
  }
}

interface TokenCategory {
  colors: Record<string, string>
  spacing: Record<string, string>
  typography: Record<string, string>
  borderRadius: Record<string, string>
  shadows: Record<string, string>
  other: Record<string, string | number | boolean>
}

// Convert Figma color (0-1 range) to CSS format
function figmaColorToCSS(color: FigmaVariableValue): string {
  if (color.r === undefined || color.g === undefined || color.b === undefined) {
    return "transparent"
  }

  const r = Math.round(color.r * 255)
  const g = Math.round(color.g * 255)
  const b = Math.round(color.b * 255)
  const a = color.a ?? 1

  if (a === 1) {
    return `rgb(${r}, ${g}, ${b})`
  }
  return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`
}

// Convert Figma color to OKLCH (for modern CSS)
function figmaColorToOKLCH(color: FigmaVariableValue): string {
  if (color.r === undefined || color.g === undefined || color.b === undefined) {
    return "transparent"
  }

  // Simple RGB to OKLCH approximation
  const r = color.r
  const g = color.g
  const b = color.b
  const a = color.a ?? 1

  // Calculate perceived lightness
  const l = 0.2126 * r + 0.7152 * g + 0.0722 * b

  // Calculate chroma (saturation)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const c = max - min

  // Calculate hue
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
  return `oklch(${l.toFixed(3)} ${(c * 0.4).toFixed(3)} ${h.toFixed(1)} / ${a.toFixed(2)})`
}

// Convert variable name to CSS custom property name
function toCSSVariableName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\//g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

// Convert variable name to JS object key
function toJSKey(name: string): string {
  const parts = name.split("/")
  return parts[parts.length - 1]
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
}

// Categorize variables based on their names
function categorizeVariable(name: string): keyof TokenCategory {
  const lowerName = name.toLowerCase()
  if (lowerName.includes("color") || lowerName.includes("background") || lowerName.includes("foreground") || lowerName.includes("border-color")) {
    return "colors"
  }
  if (lowerName.includes("spacing") || lowerName.includes("gap") || lowerName.includes("padding") || lowerName.includes("margin")) {
    return "spacing"
  }
  if (lowerName.includes("font") || lowerName.includes("text") || lowerName.includes("line-height") || lowerName.includes("letter")) {
    return "typography"
  }
  if (lowerName.includes("radius") || lowerName.includes("rounded")) {
    return "borderRadius"
  }
  if (lowerName.includes("shadow") || lowerName.includes("elevation")) {
    return "shadows"
  }
  return "other"
}

async function fetchFigmaVariables(): Promise<FigmaVariablesResponse> {
  if (!FIGMA_API_TOKEN) {
    throw new Error("FIGMA_API_TOKEN environment variable is required")
  }

  console.log(`Fetching variables from Figma file: ${FIGMA_FILE_ID}`)

  const response = await fetch(`${FIGMA_API_URL}/files/${FIGMA_FILE_ID}/variables/local`, {
    headers: {
      "X-Figma-Token": FIGMA_API_TOKEN,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Figma API error: ${response.status} - ${errorText}`)
  }

  return response.json()
}

// Fetch Figma Styles instead of Variables (works with Professional plan)
async function fetchFigmaStyles(): Promise<any> {
  if (!FIGMA_API_TOKEN) {
    throw new Error("FIGMA_API_TOKEN environment variable is required")
  }

  console.log(`Fetching styles from Figma file: ${FIGMA_FILE_ID}`)

  const response = await fetch(`${FIGMA_API_URL}/files/${FIGMA_FILE_ID}/styles`, {
    headers: {
      "X-Figma-Token": FIGMA_API_TOKEN,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Figma API error: ${response.status} - ${errorText}`)
  }

  return response.json()
}

// Fetch full file to get style definitions
async function fetchFigmaFile(): Promise<any> {
  if (!FIGMA_API_TOKEN) {
    throw new Error("FIGMA_API_TOKEN environment variable is required")
  }

  console.log(`Fetching file data from Figma...`)

  const response = await fetch(`${FIGMA_API_URL}/files/${FIGMA_FILE_ID}`, {
    headers: {
      "X-Figma-Token": FIGMA_API_TOKEN,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Figma API error: ${response.status} - ${errorText}`)
  }

  return response.json()
}

function processVariables(data: FigmaVariablesResponse): {
  tokens: Record<string, TokenCategory>
  cssVariables: Record<string, Record<string, string>>
} {
  const { variableCollections, variables } = data.meta

  const tokens: Record<string, TokenCategory> = {}
  const cssVariables: Record<string, Record<string, string>> = {}

  // Process each collection
  for (const [collectionId, collection] of Object.entries(variableCollections)) {
    console.log(`Processing collection: ${collection.name}`)

    // Initialize tokens for each mode
    for (const mode of collection.modes) {
      const modeKey = mode.name.toLowerCase()
      if (!tokens[modeKey]) {
        tokens[modeKey] = {
          colors: {},
          spacing: {},
          typography: {},
          borderRadius: {},
          shadows: {},
          other: {},
        }
      }
      if (!cssVariables[modeKey]) {
        cssVariables[modeKey] = {}
      }
    }

    // Process variables in this collection
    for (const variableId of collection.variableIds) {
      const variable = variables[variableId]
      if (!variable) continue

      const category = categorizeVariable(variable.name)
      const cssName = `--${toCSSVariableName(variable.name)}`
      const jsKey = toJSKey(variable.name)

      // Process each mode
      for (const mode of collection.modes) {
        const modeKey = mode.name.toLowerCase()
        const value = variable.valuesByMode[mode.modeId]

        if (!value) continue

        let cssValue: string
        let jsValue: string | number | boolean

        switch (variable.resolvedType) {
          case "COLOR":
            if (value.type === "VARIABLE_ALIAS" && value.id) {
              // Reference to another variable
              const referencedVar = variables[value.id]
              if (referencedVar) {
                cssValue = `var(--${toCSSVariableName(referencedVar.name)})`
                jsValue = cssValue
              } else {
                continue
              }
            } else {
              cssValue = figmaColorToOKLCH(value)
              jsValue = cssValue
            }
            break

          case "FLOAT":
            const numValue = value as unknown as number
            cssValue = `${numValue}px`
            jsValue = numValue
            break

          case "STRING":
            cssValue = value as unknown as string
            jsValue = cssValue
            break

          case "BOOLEAN":
            jsValue = value as unknown as boolean
            cssValue = String(jsValue)
            break

          default:
            continue
        }

        cssVariables[modeKey][cssName] = cssValue

        if (category === "other") {
          tokens[modeKey][category][jsKey] = jsValue
        } else {
          tokens[modeKey][category][jsKey] = cssValue
        }
      }
    }
  }

  return { tokens, cssVariables }
}

function generateTypeScriptFile(tokens: Record<string, TokenCategory>): string {
  const defaultMode = Object.keys(tokens)[0] || "light"
  const defaultTokens = tokens[defaultMode]

  return `/**
 * Design Tokens - Auto-generated from Figma Variables
 * Generated on: ${new Date().toISOString()}
 *
 * DO NOT EDIT DIRECTLY - Run 'npm run sync:figma' to update
 */

// Color Tokens
export const colors = ${JSON.stringify(defaultTokens?.colors || {}, null, 2)}

// Spacing Tokens
export const spacing = ${JSON.stringify(defaultTokens?.spacing || {}, null, 2)}

// Typography Tokens
export const typography = ${JSON.stringify(defaultTokens?.typography || {}, null, 2)}

// Border Radius Tokens
export const borderRadius = ${JSON.stringify(defaultTokens?.borderRadius || {}, null, 2)}

// Shadow Tokens
export const shadows = ${JSON.stringify(defaultTokens?.shadows || {}, null, 2)}

// Other Tokens
export const other = ${JSON.stringify(defaultTokens?.other || {}, null, 2)}

// All tokens by mode
export const tokensByMode = ${JSON.stringify(tokens, null, 2)}

// Export default mode
export const designTokens = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  ...other,
}

export default designTokens
`
}

function generateCSSFile(cssVariables: Record<string, Record<string, string>>): string {
  let css = `/**
 * CSS Variables - Auto-generated from Figma Variables
 * Generated on: ${new Date().toISOString()}
 *
 * DO NOT EDIT DIRECTLY - Run 'npm run sync:figma' to update
 */

`

  for (const [mode, variables] of Object.entries(cssVariables)) {
    const selector = mode === "light" ? ":root" : `.${mode}`
    css += `${selector} {\n`

    for (const [name, value] of Object.entries(variables)) {
      css += `  ${name}: ${value};\n`
    }

    css += `}\n\n`
  }

  return css
}

async function main() {
  try {
    console.log("Starting Figma sync...")
    console.log("")

    // Try to fetch styles first (works with Professional plan)
    let fileData: any
    try {
      fileData = await fetchFigmaFile()
    } catch (error) {
      console.error("Error fetching Figma file:", error)
      process.exit(1)
    }

    // Extract styles from file
    const styles = fileData.styles || {}
    const styleCount = Object.keys(styles).length

    console.log(`Found ${styleCount} styles in Figma file`)

    if (styleCount === 0) {
      console.log("No styles found. Checking for published styles...")
      const stylesResponse = await fetchFigmaStyles()
      console.log("Styles response:", JSON.stringify(stylesResponse, null, 2))
    }

    // Process styles into tokens
    const tokens: Record<string, any> = {
      colors: {},
      typography: {},
      effects: {},
    }

    const cssVariables: Record<string, string> = {}

    // Process each style
    for (const [nodeId, style] of Object.entries(styles) as [string, any][]) {
      const styleName = style.name || ""
      const styleType = style.styleType || ""
      const cssName = `--${toCSSVariableName(styleName)}`

      console.log(`  - ${styleName} (${styleType})`)

      switch (styleType) {
        case "FILL":
          tokens.colors[toJSKey(styleName)] = `var(${cssName})`
          cssVariables[cssName] = "/* color - see Figma */"
          break
        case "TEXT":
          tokens.typography[toJSKey(styleName)] = `var(${cssName})`
          cssVariables[cssName] = "/* text style - see Figma */"
          break
        case "EFFECT":
          tokens.effects[toJSKey(styleName)] = `var(${cssName})`
          cssVariables[cssName] = "/* effect - see Figma */"
          break
      }
    }

    // Generate TypeScript file
    const tsContent = `/**
 * Design Tokens - Synced from Figma Styles
 * Generated on: ${new Date().toISOString()}
 * File: ${FIGMA_FILE_ID}
 *
 * To update, run: npm run sync:figma
 */

// Color Tokens (from Figma Fill Styles)
export const colors = ${JSON.stringify(tokens.colors, null, 2)}

// Typography Tokens (from Figma Text Styles)
export const typography = ${JSON.stringify(tokens.typography, null, 2)}

// Effect Tokens (from Figma Effect Styles)
export const effects = ${JSON.stringify(tokens.effects, null, 2)}

// All tokens
export const figmaTokens = {
  colors,
  typography,
  effects,
}

export default figmaTokens
`

    // Generate CSS file
    let cssContent = `/**
 * CSS Variables - Synced from Figma Styles
 * Generated on: ${new Date().toISOString()}
 * File: ${FIGMA_FILE_ID}
 *
 * To update, run: npm run sync:figma
 */

:root {
`
    for (const [name, value] of Object.entries(cssVariables)) {
      cssContent += `  ${name}: ${value};\n`
    }
    cssContent += `}\n`

    // Write files
    const outputDir = path.join(process.cwd(), "lib", "tokens")
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    const tsPath = path.join(outputDir, "figma-tokens.ts")
    const cssPath = path.join(outputDir, "figma-variables.css")

    fs.writeFileSync(tsPath, tsContent)
    fs.writeFileSync(cssPath, cssContent)

    console.log("")
    console.log("Generated files:")
    console.log(`  - ${tsPath}`)
    console.log(`  - ${cssPath}`)
    console.log("")
    console.log("Sync completed successfully!")

  } catch (error) {
    console.error("Error syncing Figma:", error)
    process.exit(1)
  }
}

main()
