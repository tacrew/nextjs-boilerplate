import { Menu, Transition } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import * as React from 'react'

import { Link } from '@/components/element'

import { useSignout } from '@/features/auth/hooks'

type UserNavigationItem = {
  name: string
  to: string
  onClick?: () => void
}

const UserNavigation = () => {
  const { mutateAsync } = useSignout()

  const userNavigation = [
    { name: 'ユーザー情報', to: '/profile' },
    {
      name: 'ログアウト',
      to: '/signin',
      onClick: () => mutateAsync(undefined),
    },
  ].filter(Boolean) as UserNavigationItem[]

  return (
    <Menu as="div" className="relative ml-3">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex items-center max-w-xs p-2 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">ユーザーメニューを開く</span>
              <UserIcon className="w-8 h-8 rounded-full" />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      onClick={item.onClick}
                      href={item.to}
                      className={clsx(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

type PageWithHeaderProps = {
  children: React.ReactNode
}

export const PageWithHeader = ({ children }: PageWithHeaderProps) => {
  return (
    <>
      <div className="relative z-10 flex flex-shrink-0 h-16 bg-white shadow">
        <div className="flex justify-end flex-1 px-4">
          <div className="flex items-center ml-4 md:ml-6">
            <UserNavigation />
          </div>
        </div>
      </div>
      <div className="relative flex-1 overflow-y-auto focus:outline-none">
        {children}
      </div>
    </>
  )
}
