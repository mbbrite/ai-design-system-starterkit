"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { CodeBlock } from "./code-block"

interface ComponentPreviewProps {
  children: React.ReactNode
  code: string
  className?: string
}

export function ComponentPreview({ children, code, className }: ComponentPreviewProps) {
  return (
    <Tabs defaultValue="preview" className="relative w-full">
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="preview"
          className="rounded-none border-b-2 border-b-transparent px-4 pb-3 pt-2 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className="rounded-none border-b-2 border-b-transparent px-4 pb-3 pt-2 data-[state=active]:border-b-primary data-[state=active]:bg-transparent"
        >
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="mt-0 border-0 p-0">
        <div
          className={cn(
            "flex min-h-[350px] items-center justify-center rounded-md border p-10 mt-4",
            className
          )}
        >
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code" className="mt-4 border-0 p-0">
        <CodeBlock code={code} />
      </TabsContent>
    </Tabs>
  )
}
