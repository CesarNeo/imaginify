import { ReactNode } from 'react'

function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <main className="auth">{children}</main>
}

export default AuthLayout
