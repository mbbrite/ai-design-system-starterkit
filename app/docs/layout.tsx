"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/docs/sidebar"
import { MobileNav } from "@/components/docs/mobile-nav"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <Sidebar />
      </aside>

      {/* Mobile Navigation */}
      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />

      {/* Main Content */}
      <main className="flex-1 lg:pl-72">
        {/* Mobile Header */}
        <div className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
          <span className="font-semibold">Documentation</span>
        </div>

        <div className="container py-8 px-4 sm:px-6 lg:px-8 max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  )
}
