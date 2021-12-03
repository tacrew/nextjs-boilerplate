import { ReactNode } from 'react'
import clsx from 'clsx'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export type LinkProps = NextLinkProps & {
  className?: string
  children: ReactNode
}

export const Link = ({ className, children, ...props }: LinkProps) => {
  return (
    <NextLink {...props}>
      <a className={clsx('text-indigo-600 hover:text-indigo-900', className)}>
        {children}
      </a>
    </NextLink>
  )
}
