"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarNav } from "./sidebar-nav"

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle>Documentation</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)] py-4">
          <SidebarNav onNavigate={() => onOpenChange(false)} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
