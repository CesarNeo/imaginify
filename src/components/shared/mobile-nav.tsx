'use client'

import { SignedIn, UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAV_LINKS } from '@/utils/constants'

import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

function MobileNav() {
  const pathname = usePathname()

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="Logo Imaginify"
          width={180}
          height={28}
          className="h-7 w-[11.25rem]"
          priority
        />
      </Link>

      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <Menu className="size-8 text-muted-foreground" />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <ul className="header-nav_elements">
                {NAV_LINKS.map((link) => {
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
            </SheetContent>
          </Sheet>
        </SignedIn>
      </nav>
    </header>
  )
}

export default MobileNav
