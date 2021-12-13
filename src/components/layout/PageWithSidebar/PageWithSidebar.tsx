import * as React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FolderIcon, HomeIcon } from '@heroicons/react/outline'

import { Link } from '@/components/element'

type SideNavigationItem = {
  name: string
  to: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

const SideNavigation = () => {
  const router = useRouter()
  const navigation = [
    { name: 'Top', to: '/', icon: HomeIcon },
    { name: 'Note', to: '/note', icon: FolderIcon },
  ].filter(Boolean) as SideNavigationItem[]

  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.to}
          className={clsx(
            'text-gray-300 hover:bg-gray-700 hover:text-white',
            'group flex items-center px-2 py-2 text-base font-medium rounded-md',
            router.pathname === item.to && 'bg-gray-900 text-white'
          )}
        >
          <item.icon
            className={clsx(
              'text-gray-400 group-hover:text-gray-300',
              'mr-4 flex-shrink-0 h-6 w-6'
            )}
            aria-hidden="true"
          />
          {item.name}
        </Link>
      ))}
    </>
  )
}

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex items-center flex-shrink-0 h-16 px-4 bg-gray-900">
          <Link className="flex items-center text-white" href="/">
            <Image
              className="text-white fill-current"
              src="/vercel.svg"
              alt="Workflow"
              width={72}
              height={16}
            />
            <span className="text-xl font-semibold text-white">Sample</span>
          </Link>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 px-2 py-4 space-y-1 bg-gray-800">
            <SideNavigation />
          </nav>
        </div>
      </div>
    </div>
  )
}

type PageWithSidebarProps = {
  children: React.ReactNode
}

export const PageWithSidebar = ({ children }: PageWithSidebarProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 w-0 overflow-hidden">{children}</div>
    </div>
  )
}
