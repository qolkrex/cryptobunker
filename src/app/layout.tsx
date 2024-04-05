import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '../components/common/Navbar'
import { Footer } from '../components/common/Footer'
import { LayoutProviders } from '@/components/layouts/LayoutProviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoBunker',
  description: 'CryptoBunker is a platform for Swapping cryptocurrencies',
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
          {children}
        </LayoutProviders>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
