'use client'

import dynamic from 'next/dynamic'
import { ThemeModeToggle } from '@/components/theme-mode-toggle'
import { Separator } from '@/components/ui/separator'
import { MobileNav } from '@/components/mobile-nav'
import { MainNav } from '@/components/main-nav'
import { buttonVariants } from './ui/button'
import { Icons } from '@/components/icons'
import { siteConfig } from '@/config/site'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

const CommandMenu = dynamic(() =>
  import('@/components/command-menu').then((mod) => mod.CommandMenu)
)

interface HeaderContentProps {
  messages: {
    blog: string
    categories: string
    menu: string
    toggleMenu: string
    search: string
    noResultsFound: string
    searchPosts: string
    typeCommandOrSearch: string
    themes: {
      dark: string
      theme: string
      light: string
      system: string
    }
  }
}

export function SiteHeaderMenuLinks() {
  return (
    <>
      <Link href={siteConfig.links.github.url} target="_blank" rel="noreferrer">
        <div
          className={cn(
            buttonVariants({
              variant: 'ghost',
            }),
            'w-9 px-0'
          )}
        >
          <Icons.gitHub className="size-4" />
          <span className="sr-only">GitHub</span>
        </div>
      </Link>
    </>
  )
}

export function HeaderContent({ messages }: HeaderContentProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-5xl">
        <div className="flex h-14 items-center">
          <MainNav
            messages={{
              blog: messages.blog,
              categories: messages.categories,
            }}
          />

          <MobileNav
            messages={{
              menu: messages.menu,
              toggleMenu: messages.toggleMenu,
            }}
            menuLinks={<SiteHeaderMenuLinks />}
          />

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu
                messages={{
                  search: messages.search,
                  noResultsFound: messages.noResultsFound,
                  typeCommandOrSearch: messages.typeCommandOrSearch,
                  searchPosts: messages.searchPosts,
                }}
              />
            </div>

            <nav className="flex items-center">
              <ThemeModeToggle
                messages={{
                  dark: messages.themes.dark,
                  light: messages.themes.light,
                  system: messages.themes.system,
                }}
              />

              <div className="phone:flex hidden items-center">
                <Separator orientation="vertical" className="mx-1 h-5" />
                <SiteHeaderMenuLinks />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
