import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { IBM_Plex_Sans as IBMPlexSans } from 'next/font/google'
import { ReactNode } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'

const ibmPlex = IBMPlexSans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',
})

export const metadata: Metadata = {
  title: 'Imaginify',
  description: 'AI-powered image generator',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: '#7c3aed' },
      }}
    >
      <html lang="en">
        <body className={cn('font-ibm-plex antialiased', ibmPlex.variable)}>
          {children}

          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  )
}
