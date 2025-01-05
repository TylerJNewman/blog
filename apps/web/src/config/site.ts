import { absoluteUrl } from '@/lib/utils'
import en from '@/i18n/locales/en.json'
import pt from '@/i18n/locales/pt.json'

export const siteConfig = {
  name: 'Tyler Newman',

  description: {
    en: en.site.description,
    pt: pt.site.description,
  },

  url: process.env.NEXT_PUBLIC_APP_URL,

  og: {
    image: absoluteUrl('/og.jpg'),
    size: {
      width: 1200,
      height: 630,
    },
  },

  author: {
    name: 'Tyler Newman',
    site: 'https://github.com/TylerJNewman',
  },

  links: {
    twitter: {
      label: 'Twitter',
      username: '@TylerJNewman',
      url: 'https://twitter.com/TylerJNewman',
    },

    github: {
      label: 'GitHub',
      url: 'https://github.com/TylerJNewman',
    },
  },
} as const

export type SiteConfig = typeof siteConfig
