/**
 * Application Configuration
 * Load environment variables and provide type-safe access
 */

// Figma Configuration
export const figmaConfig = {
  apiToken: process.env.FIGMA_API_TOKEN,
  fileId: process.env.NEXT_PUBLIC_FIGMA_FILE_ID,
  projectId: process.env.NEXT_PUBLIC_FIGMA_PROJECT_ID,
  apiUrl: 'https://api.figma.com/v1',
} as const

// API Configuration
export const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: parseInt(process.env.API_TIMEOUT || '10000'),
  secretKey: process.env.API_SECRET_KEY,
} as const

// Database Configuration
export const databaseConfig = {
  url: process.env.DATABASE_URL,
  type: process.env.DATABASE_TYPE || 'mongodb',
} as const

// Authentication Configuration
export const authConfig = {
  domain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  clientId: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
  secret: process.env.AUTH_SECRET,
} as const

// Email Configuration
export const emailConfig = {
  smtpHost: process.env.SMTP_HOST,
  smtpPort: parseInt(process.env.SMTP_PORT || '587'),
  smtpUser: process.env.SMTP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  smtpFrom: process.env.SMTP_FROM || 'noreply@example.com',
} as const

// Analytics Configuration
export const analyticsConfig = {
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
} as const

// Feature Flags
export const featureFlags = {
  darkMode: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE === 'true',
  animations: process.env.NEXT_PUBLIC_ENABLE_ANIMATIONS === 'true',
  analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
} as const

// Environment Detection
export const environment = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  nodeEnv: process.env.NODE_ENV || 'development',
} as const

// Validation
export function validateConfig() {
  const errors: string[] = []

  // Validate Figma config (only if Figma integration is needed)
  if (process.env.NEXT_PUBLIC_FIGMA_FILE_ID && !process.env.FIGMA_API_TOKEN) {
    errors.push('FIGMA_API_TOKEN is required when NEXT_PUBLIC_FIGMA_FILE_ID is set')
  }

  // Validate Database config (only if database is needed)
  if (process.env.DATABASE_URL) {
    if (!process.env.DATABASE_TYPE) {
      errors.push('DATABASE_TYPE is required when DATABASE_URL is set')
    }
  }

  // Validate Auth config (only if auth is needed)
  if (process.env.NEXT_PUBLIC_AUTH_DOMAIN && !process.env.AUTH_SECRET) {
    errors.push('AUTH_SECRET is required when NEXT_PUBLIC_AUTH_DOMAIN is set')
  }

  if (errors.length > 0) {
    console.error('Configuration validation errors:')
    errors.forEach((error) => console.error(`  - ${error}`))
    if (environment.isProduction) {
      throw new Error('Invalid configuration')
    }
  }

  return errors.length === 0
}

// Call validation on module load (in development only)
if (environment.isDevelopment) {
  validateConfig()
}
