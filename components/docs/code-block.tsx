"use client"

import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useClipboard } from "@/hooks/use-clipboard"

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  const { isCopied, copy } = useClipboard()

  return (
    <div className="relative rounded-md bg-muted">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-8 w-8 z-10"
        onClick={() => copy(code)}
      >
        {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">Copy code</span>
      </Button>
      <ScrollArea className="max-h-[400px]">
        <pre className="p-4 font-mono text-sm overflow-x-auto">
          <code>{code}</code>
        </pre>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
