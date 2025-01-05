import { unstable_setRequestLocale } from 'next-intl/server'

import type { LocaleOptions } from '@/lib/opendocs/types/i18n'
import { locales } from '@/config/i18n'

interface BlogLayoutProps {
  children: React.ReactNode
  params: {
    locale: LocaleOptions
  }
}

export const dynamicParams = true

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function BlogLayout({
  children,
  params,
}: BlogLayoutProps) {
  unstable_setRequestLocale(params.locale)

  return (
    <main className="relative py-6 lg:py-10">
      <div className="container mx-auto max-w-5xl">{children}</div>
    </main>
  )
}
