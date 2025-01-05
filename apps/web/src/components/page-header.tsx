import Balance from 'react-wrap-balancer'

import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PageHeader({ className, children, ...props }: PageHeaderProps) {
  return (
    <section
      className={cn(
        'flex flex-col items-start gap-2 pb-8 pt-6 md:pb-10 md:pt-8',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        'text-2xl font-bold leading-tight tracking-tighter sm:text-3xl md:text-4xl',
        className
      )}
      {...props}
    />
  )
}

export function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-lg text-muted-foreground sm:text-xl', className)}
      {...props}
    />
  )
}

export function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex w-full items-center gap-4 pt-2', className)}
      {...props}
    />
  )
}
