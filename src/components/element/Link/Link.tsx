import { ReactNode } from 'react'
import clsx from 'clsx'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export type LinkProps = NextLinkProps & {
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  children: ReactNode
}

export const Link = ({ className, onClick, children, ...props }: LinkProps) => {
  return (
    <NextLink {...props} passHref>
      <a
        onClick={onClick}
        className={clsx('text-indigo-600 hover:text-indigo-900', className)}
      >
        {children}
      </a>
    </NextLink>
  )
}
