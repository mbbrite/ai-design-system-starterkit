import { Badge } from "@/components/ui/badge"

interface DocHeaderProps {
  title: string
  description: string
  categories?: string[]
}

export function DocHeader({ title, description, categories }: DocHeaderProps) {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="text-lg text-muted-foreground">{description}</p>
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
