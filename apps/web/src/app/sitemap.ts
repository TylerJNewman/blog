import type { MetadataRoute } from 'next'

import { allBlogs } from 'contentlayer/generated'
import { absoluteUrl } from '@/lib/utils'
import { locales } from '@/config/i18n'

type Sitemap = MetadataRoute.Sitemap

export default function sitemap(): Sitemap {
  const paths: Sitemap = [
    {
      url: absoluteUrl(`/`),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, absoluteUrl(`/${locale}`)])
        ),
      },
    },
    {
      url: absoluteUrl(`/blog`),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, absoluteUrl(`/${locale}/blog`)])
        ),
      },
    },
    {
      url: absoluteUrl(`/blog/categories`),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [
            locale,
            absoluteUrl(`/${locale}/blog/categories`),
          ])
        ),
      },
    },
  ]

  const blogPaths: Sitemap = allBlogs.map((post) => {
    const [, ...postSlugList] = post.slugAsParams.split('/')
    const postSlug = postSlugList.join('/') || ''

    return {
      url: absoluteUrl(`/blog/${postSlug}`),
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [
            locale,
            absoluteUrl(`/${locale}/blog/${postSlug}`),
          ])
        ),
      },
    }
  })

  return [...paths, ...blogPaths]
}
