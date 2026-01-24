# API Configuration Setup Guide

This guide shows how to configure various APIs and services for your Next.js starter kit.

## Quick Start

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in your API credentials in `.env.local`

3. Import config in your code:
```typescript
import { figmaConfig, apiConfig, authConfig } from '@/lib/config'
```

## Configuration Files

- `.env.example` - Template for all environment variables
- `.env.local.example` - Detailed local development setup
- `lib/config.ts` - Type-safe configuration loader
- `lib/constants.ts` - Application constants

## Environment Variables

### Figma Integration

Get your Figma API token:
1. Go to https://www.figma.com/developers/api
2. Click "Create new personal access token"
3. Copy the token to `.env.local`:

```env
FIGMA_API_TOKEN=figd_xxx...
NEXT_PUBLIC_FIGMA_FILE_ID=your_file_id
```

#### How to find your File ID:
- Open your Figma file
- Copy the URL: `https://www.figma.com/file/YOUR_FILE_ID/...`
- YOUR_FILE_ID is the part after `/file/`

### API Configuration

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_TIMEOUT=10000
API_SECRET_KEY=your_secret_key
```

### Database Configuration (Optional)

#### MongoDB:
```env
DATABASE_URL=mongodb://localhost:27017/my_app_dev
DATABASE_TYPE=mongodb
```

#### PostgreSQL:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/my_app_dev
DATABASE_TYPE=postgresql
```

### Authentication (Optional)

#### Auth0:
```env
NEXT_PUBLIC_AUTH_DOMAIN=yourapp.auth0.com
NEXT_PUBLIC_AUTH_CLIENT_ID=xxxxx
AUTH_SECRET=your_secret
```

#### NextAuth.js:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
```

### Email Configuration (Optional)

#### Gmail SMTP:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@example.com
```

**Note:** For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833), not your account password.

### Analytics (Optional)

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

## Using Configuration in Code

### Import Configuration:
```typescript
import {
  figmaConfig,
  apiConfig,
  databaseConfig,
  authConfig,
  emailConfig,
  analyticsConfig,
  featureFlags,
  environment,
} from '@/lib/config'
```

### Example Usage:

```typescript
// API calls
async function fetchData() {
  const response = await fetch(`${apiConfig.baseUrl}/data`, {
    timeout: apiConfig.timeout,
  })
  return response.json()
}

// Figma integration
async function getFigmaData() {
  const response = await fetch(
    `${figmaConfig.apiUrl}/files/${figmaConfig.fileId}`,
    {
      headers: {
        'X-Figma-Token': figmaConfig.apiToken,
      },
    }
  )
  return response.json()
}

// Feature flags
if (featureFlags.darkMode) {
  // Enable dark mode
}

// Environment detection
if (environment.isProduction) {
  // Production-only code
}
```

## API Integrations

### 1. Figma API

**Setup:**
1. Create Figma account: https://figma.com
2. Create a personal access token
3. Add to `.env.local`

**Usage:**
```typescript
import { figmaConfig } from '@/lib/config'

async function syncDesignTokens() {
  const response = await fetch(
    `${figmaConfig.apiUrl}/files/${figmaConfig.fileId}`,
    {
      headers: {
        'X-Figma-Token': figmaConfig.apiToken,
      },
    }
  )
  return response.json()
}
```

### 2. REST API

**Setup:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_SECRET_KEY=your_secret
```

**Usage:**
```typescript
import { apiConfig } from '@/lib/config'

const response = await fetch(`${apiConfig.baseUrl}/endpoint`, {
  headers: {
    'X-API-Key': apiConfig.secretKey,
  },
})
```

### 3. Database

**MongoDB Setup:**
```bash
# Install MongoDB locally or use MongoDB Atlas
# https://www.mongodb.com/cloud/atlas
```

**PostgreSQL Setup:**
```bash
# Install PostgreSQL
brew install postgresql@15

# Start service
brew services start postgresql@15

# Create database
createdb my_app_dev
```

**Prisma ORM (Recommended):**
```bash
npm install @prisma/client prisma

# Initialize Prisma
npx prisma init

# Configure DATABASE_URL in .env.local
```

### 4. Authentication

**Auth0:**
1. Create account: https://auth0.com
2. Create application
3. Get credentials from Auth0 dashboard
4. Add to `.env.local`

**NextAuth.js:**
```bash
npm install next-auth

# Generate secret
openssl rand -base64 32
```

### 5. Email

**Gmail SMTP:**
1. Enable 2-factor authentication
2. Create [App Password](https://support.google.com/accounts/answer/185833)
3. Use app password in `.env.local`

**SendGrid:**
```bash
npm install @sendgrid/mail

# Get API key from https://sendgrid.com
```

### 6. Analytics

**Google Analytics:**
1. Create property: https://analytics.google.com
2. Get Measurement ID
3. Add to `.env.local`

**Sentry:**
1. Create account: https://sentry.io
2. Create project
3. Get DSN
4. Add to `.env.local`

## Security Best Practices

1. **Never commit `.env.local`** - Add to `.gitignore` (already done)

2. **Use `.env.example`** - Shows structure without secrets

3. **Separate secrets:**
   - `NEXT_PUBLIC_*` - Safe to expose in browser
   - Others - Server-only secrets

4. **Rotate tokens regularly:**
   - Change API tokens monthly
   - Regenerate secrets before deployment

5. **Use environment validation:**
   - `lib/config.ts` validates on load
   - Errors in development, throws in production

6. **Never log secrets:**
   ```typescript
   // Bad
   console.log(apiConfig.secretKey)

   // Good
   console.log('API configured')
   ```

## Development vs Production

### Development (.env.local):
```env
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_SECRET_KEY=dev_secret
```

### Production (.env.production):
```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.example.com
API_SECRET_KEY=production_secret
```

## Deployment

### Vercel:
1. Connect GitHub repository
2. Add environment variables in Vercel dashboard
3. Deploy

### Docker:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Self-hosted:
1. Set environment variables on server
2. Build: `npm run build`
3. Start: `npm start`

## Troubleshooting

### Variables not loading:
- Check `.env.local` exists and is not in `.gitignore`
- Restart dev server: `npm run dev`
- Verify variable name (must start with `NEXT_PUBLIC_` for browser)

### API calls fail:
- Check `NEXT_PUBLIC_API_URL` is correct
- Verify API server is running
- Check CORS headers if cross-origin

### Figma sync not working:
- Verify `FIGMA_API_TOKEN` is valid
- Check `NEXT_PUBLIC_FIGMA_FILE_ID` matches your file
- Test token: `curl -H "X-Figma-Token: YOUR_TOKEN" https://api.figma.com/v1/me`

## Tips

1. **Use TypeScript** - `lib/config.ts` provides full type safety
2. **Validate on startup** - `validateConfig()` catches issues early
3. **Document APIs** - Add comments to `.env.example`
4. **Use feature flags** - Toggle features without code changes
5. **Log configuration** - Helps debug environment issues (don't log secrets!)

## Next Steps

1. Copy `.env.example` → `.env.local`
2. Add your Figma token
3. Add other API keys as needed
4. Run dev server: `npm run dev`
5. Test: `npm run build`

## Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Figma API Documentation](https://www.figma.com/developers/api)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [12 Factor App](https://12factor.net/)

---

Happy coding! 🚀
