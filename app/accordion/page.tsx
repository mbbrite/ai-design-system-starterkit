'use client'

import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function AccordionPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Figma Design Container */}
        <div className="rounded-3xl border border-border bg-card p-14">
          {/* Title Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-semibold tracking-tight mb-2">Accordion</h1>
            <p className="text-base text-muted-foreground">
              A vertically stacked set of interactive headings that each reveal a section of content.
            </p>
          </div>

          {/* Accordion Component */}
          <div className="rounded-xl border border-dashed border-border p-5">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-border">
                <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
                  Product Information
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm">
                  <p className="mb-4">
                    Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.
                  </p>
                  <p>
                    Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-b border-border">
                <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
                  Shipping Details
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm">
                  <p className="mb-4">
                    We offer worldwide shipping with multiple delivery options to suit your needs. Standard shipping typically takes 5-7 business days.
                  </p>
                  <p>
                    Express shipping is available for most locations with delivery in 2-3 business days. Free shipping on orders over $50.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-0">
                <AccordionTrigger className="py-4 text-sm font-medium hover:no-underline">
                  Return Policy
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm">
                  <p className="mb-4">
                    We offer a 30-day return policy for all unused items in their original packaging. Returns are free for defective products.
                  </p>
                  <p>
                    To initiate a return, please contact our customer service team with your order number and reason for return.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
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
