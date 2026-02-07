"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { componentCategories, formatComponentName } from "@/lib/docs/categories"

interface SidebarNavProps {
  onNavigate?: () => void
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="space-y-1 px-3">
      <Link
        href="/docs"
        onClick={onNavigate}
        className={cn(
          "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
          pathname === "/docs"
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        )}
      >
        Introduction
      </Link>

      {Object.entries(componentCategories).map(([category, componentSlugs]) => (
        <Collapsible key={category} defaultOpen className="space-y-1">
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent [&[data-state=open]>svg]:rotate-90">
            {category}
            <ChevronRight className="h-4 w-4 transition-transform duration-200" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pl-4">
            {componentSlugs.map((slug) => {
              const isActive = pathname === `/docs/components/${slug}`
              return (
                <Link
                  key={slug}
                  href={`/docs/components/${slug}`}
                  onClick={onNavigate}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {formatComponentName(slug)}
                </Link>
              )
            })}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </nav>
  )
}
