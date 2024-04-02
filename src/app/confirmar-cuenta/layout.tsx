import '../globals.css'
import { LayoutProviders } from '@/components/layouts/LayoutProviders'
import { HomeLayout } from '@/components/layouts/HomeLayout'

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
          href='img/g-token.ico'
        />
      </head>
      <body>
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
