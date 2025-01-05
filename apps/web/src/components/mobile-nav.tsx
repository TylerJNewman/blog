'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'

import {
  Sheet,
  SheetTitle,
  SheetTrigger,
  SheetContent,
} from '@/components/ui/sheet'

import { getObjectValueByLocale } from '@/lib/opendocs/utils/locale'
import { ScrollArea } from './ui/scroll-area'
import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'
import { MobileLink } from './mobile-link'
import { blogConfig } from '@/config/blog'
import { usePathname } from '@/navigation'
import { Button } from './ui/button'
import type { LocaleOptions } from '@/lib/opendocs/types/i18n'

interface MobileNavProps {
  menuLinks: JSX.Element
  messages: {
    menu: string
    toggleMenu: string
  }
}

export function MobileNav({ messages, menuLinks }: MobileNavProps) {
  const pathname = usePathname()
  const locale = useLocale() as LocaleOptions
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.menu className="size-5" />
          <span className="sr-only">${messages.toggleMenu}</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="pr-0">
        <SheetTitle className="sr-only">{messages.menu}</SheetTitle>

        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="mr-2 size-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>

        {menuLinks && (
          <div className="flex phone:hidden flex-col space-y-2 items-end pr-2">
            {menuLinks}
          </div>
        )}

        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {blogConfig.mainNav?.map((item) => (
              <MobileLink
                key={item.href}
                href={item.href || '/blog'}
                onOpenChange={setOpen}
              >
                {getObjectValueByLocale(item.title, locale)}
              </MobileLink>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
