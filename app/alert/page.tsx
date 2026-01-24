'use client'

import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { CircleCheck, Popcorn, CircleAlert } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function AlertPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Figma Design Container */}
        <div className="rounded-3xl border border-border bg-card p-14">
          {/* Title Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-semibold tracking-tight mb-2">Alert</h1>
            <p className="text-base text-muted-foreground">
              Displays a callout for user attention.
            </p>
          </div>

          {/* Default Alert - with icon, title, and description */}
          <Alert className="mb-2">
            <CircleCheck className="h-4 w-4" />
            <AlertTitle>Success! Your changes have been saved</AlertTitle>
            <AlertDescription>
              This is an alert with icon, title and description.
            </AlertDescription>
          </Alert>

          {/* Divider */}
          <div className="py-2">
            <Separator />
          </div>

          {/* Title Only Alert */}
          <Alert className="mb-2">
            <Popcorn className="h-4 w-4" />
            <AlertTitle>This Alert has a title and an icon. No description.</AlertTitle>
          </Alert>

          {/* Divider */}
          <div className="py-2">
            <Separator />
          </div>

          {/* Destructive Alert */}
          <Alert variant="destructive">
            <CircleAlert className="h-4 w-4" />
            <AlertTitle>Unable to process your payment.</AlertTitle>
            <AlertDescription className="text-destructive/90">
              <p>Please verify your billing information and try again.</p>
              <ul className="list-disc list-inside mt-1 space-y-0">
                <li>Check your card details</li>
                <li>Ensure sufficient funds</li>
                <li>Verify billing address</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Button asChild variant="outline">
            <a href="/">← Back to Home</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/components">View All Components</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
