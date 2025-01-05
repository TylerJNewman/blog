import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>{t('blog.categories.title')}</PageHeaderHeading>
        <PageHeaderDescription>
          {t('blog.categories.description')}
        </PageHeaderDescription>
      </PageHeader>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogConfig.categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className="block transition-colors hover:bg-muted/50"
          >
            <Card className="h-full backdrop-blur-lg dark:bg-card-primary">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-muted/45 flex w-11 items-center justify-center rounded-md px-3 py-2 text-center text-lg">
                    {categoryIcons[category.slug]}
                  </div>
                  <CardTitle>{category.title[params.locale]}</CardTitle>
                </div>
                <CardDescription>
                  {category.description[params.locale]}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  )
}
