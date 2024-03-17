import { ReactNode } from 'react'

import Sidebar from '@/components/shared/sidebar'

function RootAppLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <main className="root">
      <Sidebar />

      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  )
}

export default RootAppLayout
