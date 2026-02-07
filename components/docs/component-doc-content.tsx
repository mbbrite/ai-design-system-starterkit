"use client"

import { Separator } from "@/components/ui/separator"
import { DocHeader } from "@/components/docs/doc-header"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { getComponentBySlug } from "@/lib/docs/components-registry"

interface ComponentDocContentProps {
  slug: string
}

export function ComponentDocContent({ slug }: ComponentDocContentProps) {
  const component = getComponentBySlug(slug)

  if (!component) {
    return null
  }

  const importStatement = `import { ${component.name} } from "@/components/ui/${slug}"`

  return (
    <div className="space-y-10">
      <DocHeader
        title={component.name}
        description={component.description}
        categories={component.categories}
      />

      <Separator />

      {/* Preview Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Preview</h2>
        <ComponentPreview code={component.code}>
          {component.preview}
        </ComponentPreview>
      </section>

      {/* Installation Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <p className="text-muted-foreground">
          Import the component from your UI library.
        </p>
        <CodeBlock code={importStatement} />
      </section>

      {/* Usage Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={component.code} />
      </section>
    </div>
  )
}
