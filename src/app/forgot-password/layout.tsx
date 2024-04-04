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
  title: 'Goldmak',
  description: 'Goldmak es una token ERC-20 que se encuentra en la red Ethereum.',
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
