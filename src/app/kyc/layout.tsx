import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { LayoutProviders } from '@/components/layouts/LayoutProviders'
import { HomeLayout } from '@/components/layouts/HomeLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoBunker',
  description: 'CryptoBunker es un sitio web que te permite comprar y vender criptomonedas.',
}

export default function MainLayout({
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
        {/* <Navbar /> */}
        <LayoutProviders>

          <HomeLayout>
            {children}
          </HomeLayout>
        </LayoutProviders>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
