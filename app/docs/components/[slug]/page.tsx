import { notFound } from "next/navigation"
import { ComponentDocContent } from "@/components/docs/component-doc-content"
import { allComponentSlugs } from "@/lib/docs/categories"

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ComponentDocPage({ params }: PageProps) {
  const { slug } = await params

  if (!allComponentSlugs.includes(slug)) {
    notFound()
  }

  return <ComponentDocContent slug={slug} />
}

export function generateStaticParams() {
  return allComponentSlugs.map((slug) => ({ slug }))
}
