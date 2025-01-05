import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { FeaturedCard } from '@/components/featured-card'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

import {
  PageHeader,
  PageActions,
  PageHeaderHeading,
  PageHeaderDescription,
} from '@/components/page-header'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'

export const dynamicParams = true

export default async function IndexPage({
  params,
}: {
  params: { locale: LocaleOptions }
}) {
  unstable_setRequestLocale(params.locale)

  const t = await getTranslations()

  return (
    <div className="container mx-auto max-w-4xl">
      <PageHeader>
        <PageHeaderHeading>
          <TextGenerateEffect words={t('site.heading')} />
        </PageHeaderHeading>

        <PageHeaderDescription>{t('site.description')}</PageHeaderDescription>

        <PageActions>
          <Link href="/blog" className={cn(buttonVariants())}>
            {t('site.buttons.read_blog')}
          </Link>

          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github.url}
            title={siteConfig.links.github.label}
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <Icons.gitHub className="mr-2 size-4" />
            {siteConfig.links.github.label}
          </Link>
        </PageActions>
      </PageHeader>

      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FeaturedCard
            icon="✍️"
            title="Latest Posts"
            description={t('site.featured_cards.blog.latest')}
            href="/blog"
          />

          <FeaturedCard
            icon="📚"
            title="Categories"
            description={t('site.featured_cards.blog.categories')}
            href="/blog/categories"
          />
        </div>
      </section>
    </div>
  )
}
