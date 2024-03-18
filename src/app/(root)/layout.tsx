import { ReactNode } from 'react'

import MobileNav from '@/components/shared/mobile-nav'
import Sidebar from '@/components/shared/sidebar'

function RootAppLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />

      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  )
}

export default RootAppLayout
