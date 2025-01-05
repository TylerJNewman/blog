import rehypePrettyCode, { type Options } from 'rehype-pretty-code'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { codeImport } from 'remark-code-import'
import { visit } from 'unist-util-visit'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import type { BlogConfig } from './src/lib/opendocs/types/blog'

import {
  makeSource,
  defineNestedType,
  defineDocumentType,
  type ComputedFields,
} from 'contentlayer2/source-files'

import { rehypeNpmCommand } from './src/lib/opendocs/utils/rehype-npm-command'
import { getContentLayerCodeTheme } from './src/lib/opendocs/utils/code-theme'
import { blogConfig } from './src/config/blog'

const blogComputedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (post) => `/${post._raw.flattenedPath}`,
  },

  slugAsParams: {
    type: 'string',
    resolve: (post) => post._raw.flattenedPath.split('/').slice(1).join('/'),
  },

  author: {
    type: 'nested',
    description: 'The author of the post',

    resolve: (
      post
    ): Partial<BlogConfig['authors'][number]> & { bio?: string } => {
      const author = blogConfig.authors.find(
        (author) => author.id === post.author_id
      )

      const [, locale] = post._raw.sourceFileDir.split('/')

      if (!author) {
        return {
          id: post?.author_id,
        }
      }

      return {
        ...author,
        bio: author.bio?.[locale as keyof typeof author.bio] || author.bio?.en,
      }
    },
  },

  readTimeInMinutes: {
    type: 'number',

    resolve: (post) => {
      const wordsPerMinute = 200
      const numberOfWords = post.body.raw.trim().split(/\s+/).length
      const readTimeInMinutes = numberOfWords / wordsPerMinute

      return Math.ceil(readTimeInMinutes)
    },
  },
}

const AuthorProperties = defineNestedType(() => ({
  name: 'AuthorProperties',

  fields: {
    id: {
      type: 'string',
    },

    name: {
      type: 'string',
    },

    bio: {
      type: 'string',
    },

    site: {
      type: 'string',
    },

    email: {
      type: 'string',
    },

    image: {
      type: 'string',
    },

    social: {
      type: 'nested',

      of: defineNestedType(() => ({
        name: 'SocialProperties',

        fields: {
          github: {
            type: 'string',
          },

          twitter: {
            type: 'string',
          },

          youtube: {
            type: 'string',
          },

          linkedin: {
            type: 'string',
          },
        },
      })),
    },
  },
}))

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  contentType: 'mdx',
  filePathPattern: `blog/**/*.mdx`,

  fields: {
    title: {
      type: 'string',
      required: true,
    },

    excerpt: {
      type: 'string',
      required: true,
    },

    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },

    author: {
      type: 'nested',
      of: AuthorProperties,
    },

    author_id: {
      type: 'string',
      description: 'The author of the post',
    },

    og_image: {
      type: 'string',
      description: 'The image for the open graph meta tag',
    },

    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
  },

  computedFields: blogComputedFields,
}))

export default makeSource({
  documentTypes: [Blog],
  contentDirPath: '../content',
  contentDirInclude: ['blog'],

  mdx: {
    remarkPlugins: [remarkGfm, codeImport],
    rehypePlugins: [
      rehypeSlug,
      rehypeNpmCommand,
      [
        rehypePrettyCode,
        {
          theme: getContentLayerCodeTheme(),
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }]
            }
          },
          onVisitHighlightedLine(node) {
            if (!node.properties.className) {
              node.properties.className = []
            }
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedChars(node) {
            node.properties.className = ['word--highlighted']
          },
        } satisfies Partial<Options>,
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
})
