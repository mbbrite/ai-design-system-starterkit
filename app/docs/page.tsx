import Link from "next/link"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { componentCategories, formatComponentName } from "@/lib/docs/categories"

export default function DocsPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Components</h1>
        <p className="text-xl text-muted-foreground">
          Beautifully designed components built with Radix UI and Tailwind CSS.
        </p>
      </div>

      {Object.entries(componentCategories).map(([category, componentSlugs]) => (
        <section key={category} className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">{category}</h2>
            <Badge variant="secondary">{componentSlugs.length}</Badge>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {componentSlugs.map((slug) => (
              <Link key={slug} href={`/docs/components/${slug}`}>
                <Card className="h-full transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {formatComponentName(slug)}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      View documentation and examples
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
