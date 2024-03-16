import { ReactNode } from 'react'

function RootAppLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <main className="root">
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  )
}

export default RootAppLayout