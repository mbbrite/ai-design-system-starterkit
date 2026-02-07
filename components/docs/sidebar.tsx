"use client"

import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarNav } from "./sidebar-nav"

export function Sidebar() {
  return (
    <div className="flex h-full flex-col border-r bg-sidebar">
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-sidebar-foreground">UI Components</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4">
        <SidebarNav />
      </ScrollArea>
    </div>
  )
}
