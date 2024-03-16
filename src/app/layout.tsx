import type { Metadata } from 'next'
import { IBM_Plex_Sans as IBMPlexSans } from 'next/font/google'
import './globals.css'
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
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('font-ibm-plex antialiased', ibmPlex.variable)}>
        {children}
      </body>
    </html>
  )
}
