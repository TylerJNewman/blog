'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useLocale } from 'next-intl'

import type { AlertDialogProps } from '@radix-ui/react-alert-dialog'
import type { LocaleOptions } from '@/lib/opendocs/types/i18n'
import { FileTextIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { useRouter } from '@/navigation'
import { cn } from '@/lib/utils'

import {
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandInput,
  CommandDialog,
} from './ui/command'

import { allBlogs } from 'contentlayer/generated'

interface CommandMenuProps extends AlertDialogProps {
  messages: {
    search: string
    noResultsFound: string
    searchPosts: string
    typeCommandOrSearch: string
  }
}

export function CommandMenu({ messages, ...props }: CommandMenuProps) {
  const router = useRouter()
  const locale = useLocale() as LocaleOptions
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  const posts = useMemo(() => {
    return allBlogs.filter((post) => {
      const [postLocale] = post.slugAsParams.split('/')
      return postLocale === locale
    })
  }, [locale])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'bg-card-primary text-muted-foreground relative h-8 w-full justify-start rounded-lg text-sm font-normal shadow-none sm:pr-12 md:w-40 lg:w-64'
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">{messages.searchPosts}...</span>

        <span className="inline-flex lg:hidden">{messages.search}...</span>

        <kbd className="bg-muted pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={`${messages.typeCommandOrSearch}...`} />

        <CommandList>
          <CommandEmpty>{messages.noResultsFound}.</CommandEmpty>

          {posts.map((post) => (
            <CommandItem
              key={post._id}
              value={`${post.title} ${post.excerpt} ${post.tags.join(' ')}`}
              className="flex items-start gap-2 py-2"
              onSelect={() => {
                const [, ...slugs] = post.slugAsParams.split('/')
                const slug = slugs.join('/')
                runCommand(() => router.push(`/blog/${slug}`))
              }}
            >
              <FileTextIcon className="mt-1 size-4 shrink-0" />
              <div className="flex flex-col gap-1">
                <div className="font-medium">{post.title}</div>
                <div className="text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
