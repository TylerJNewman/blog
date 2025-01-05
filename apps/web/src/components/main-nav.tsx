'use client'

import { Link, usePathname } from '@/navigation'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

interface MainNavProps {
  messages: {
    blog: string
    categories: string
  }
}

export function MainNav({ messages }: MainNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-6">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="size-5" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      <nav className="flex items-center gap-4">
        <Link
          href="/blog"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname.includes('/blog') && !pathname.includes('/categories')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          {messages.blog}
        </Link>
        <Link
          href="/blog/categories"
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname.includes('/categories')
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          {messages.categories}
        </Link>
      </nav>
    </div>
  )
}
