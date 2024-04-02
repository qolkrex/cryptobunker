import { getServerSession } from 'next-auth'
import { authOptions } from '@/server/helpers/auth/auth'
import { redirect } from 'next/navigation'

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getServerSession(authOptions)

    // console.log({ session });

    if (!session?.user?.roles?.includes('admin')) {
        console.log('user is not admin');
        redirect('/dashboard');
    }

    return (
        <>
            {children}
        </>
    )
}
