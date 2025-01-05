import type { BlogConfig } from '../lib/opendocs/types/blog'

export const blogConfig: BlogConfig = {
  mainNav: [
    {
      href: '/blog',
      title: {
        en: 'Blog',
        pt: 'Blog',
      },
    },
    {
      href: '/blog/categories',
      title: {
        en: 'Categories',
        pt: 'Categorias',
      },
    },
  ],

  categories: [
    {
      slug: 'engineering',
      title: {
        en: 'Engineering',
        pt: 'Engenharia',
      },
      description: {
        en: 'Technical deep dives and software engineering best practices',
        pt: 'Análises técnicas e melhores práticas de engenharia de software',
      },
    },
    {
      slug: 'product',
      title: {
        en: 'Product',
        pt: 'Produto',
      },
      description: {
        en: 'Product development, design, and user experience',
        pt: 'Desenvolvimento de produto, design e experiência do usuário',
      },
    },
    {
      slug: 'thoughts',
      title: {
        en: 'Thoughts',
        pt: 'Pensamentos',
      },
      description: {
        en: 'Personal insights and reflections on technology and life',
        pt: 'Insights pessoais e reflexões sobre tecnologia e vida',
      },
    },
  ],

  authors: [
    {
      id: 'tylerjnewman',
      name: 'Tyler Newman',
      image: '/authors/tylerjnewman.jpg',
      site: 'https://github.com/TylerJNewman',
      email: 'tylerjnewman@gmail.com',

      bio: {
        en: 'Software Engineer | Writer | Open Source Enthusiast',
        pt: 'Engenheiro de Software | Escritor | Entusiasta Open Source',
      },

      social: {
        github: 'TylerJNewman',
        twitter: '@TylerJNewman',
        linkedin: 'tylerjnewman',
      },
    },
  ],

  rss: [
    {
      type: 'xml',
      file: 'blog.xml',
      contentType: 'application/xml',
    },
    {
      type: 'json',
      file: 'blog.json',
      contentType: 'application/json',
    },
  ],
} as const
