import React, { type PropsWithChildren } from 'react'

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'

type FeaturedCardProps = PropsWithChildren<{
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  href?: string
}>

export function FeaturedCard({
  icon,
  title,
  children,
  description,
  orientation = 'vertical',
  href,
}: FeaturedCardProps) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (href) {
      return (
        <Link href={href} className="block">
          {children}
        </Link>
      )
    }
    return <>{children}</>
  }

  return (
    <Wrapper>
      <Card
        className={cn(
          'backdrop-blur-lg dark:bg-card-primary',
          href &&
            'transition-all duration-300 hover:bg-muted/50 hover:shadow-md dark:hover:bg-muted/25'
        )}
      >
        <CardHeader
          className={cn(
            'flex gap-4 pb-2',
            orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col'
          )}
        >
          {icon && (
            <div
              className={cn(
                'bg-muted/45 flex w-11 items-center justify-center rounded-md px-3 py-2 text-center text-lg',
                href && 'transition-colors group-hover:bg-muted/60'
              )}
            >
              {icon}
            </div>
          )}

          {title && <CardTitle>{title}</CardTitle>}
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          {description && <CardDescription>{description}</CardDescription>}

          {children}
        </CardContent>
      </Card>
    </Wrapper>
  )
}
