import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { LayoutProviders } from '@/components/layouts/LayoutProviders'
import { HomeLayout } from '@/components/layouts/HomeLayout'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/helpers/auth/auth'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoBunker',
  description: 'CryptoBunker is a platform for Swapping cryptocurrencies',
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/ico"
          href='img/logo.ico'
        />
      </head>
      <body className={inter.className}>
        <LayoutProviders>
          <HomeLayout>
            {children}
          </HomeLayout>
        </LayoutProviders>
      </body>
    </html>
  )
}
