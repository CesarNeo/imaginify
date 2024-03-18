'use client'

import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAV_LINKS } from '@/utils/constants'

import { Button } from '../ui/button'

function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="Logo Imaginify"
            width={180}
            height={28}
            className="h-7 w-[11.25rem]"
            priority
          />
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {NAV_LINKS.slice(0, 6).map((link) => {
                const isActiveLink = pathname === link.route
                const Icon = link.icon

                return (
                  <li key={link.route} className="w-full">
                    <Button
                      variant={isActiveLink ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        href={link.route}
                        className="flex items-center gap-2"
                      >
                        <Icon className="size-6" />
                        {link.label}
                      </Link>
                    </Button>
                  </li>
                )
              })}
            </ul>

            <ul className="sidebar-nav_elements">
              {NAV_LINKS.slice(6).map((link) => {
                const isActiveLink = pathname === link.route
                const Icon = link.icon

                return (
                  <li key={link.route} className="w-full">
                    <Button
                      variant={isActiveLink ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      asChild
                    >
                      <Link
                        href={link.route}
                        className="flex items-center gap-2"
                      >
                        <Icon className="size-6" />
                        {link.label}
                      </Link>
                    </Button>
                  </li>
                )
              })}
              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
          </SignedIn>

          <SignedOut>
            <Button asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
