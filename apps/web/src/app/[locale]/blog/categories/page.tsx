import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { blogConfig } from '@/config/blog'
import { Link } from '@/navigation'

import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription,
} from '@/components/page-header'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'

const categoryIcons: Record<string, string> = {
  engineering: '👨‍💻',
  product: '🚀',
  thoughts: '💭',
}

export const dynamicParams = true

export default async function CategoriesPage({
  params,
}: {
  params: { locale: LocaleOptions }
}) {
  unstable_setRequestLocale(params.locale)
  const t = await getTranslations()

  return (
    <div className="space-y-6">
      <PageHeader>
        <PageHeaderHeading className="font-bold">
          {t('blog.categories.description')}
        </PageHeaderHeading>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2">
        {blogConfig.categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className="transition-colors hover:bg-muted/50"
          >
            <Card className="h-full border-2 bg-card hover:bg-card/50">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-muted flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <span className="text-xl">
                      {categoryIcons[category.slug]}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-xl">
                      {category.title[params.locale]}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {category.description[params.locale]}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
