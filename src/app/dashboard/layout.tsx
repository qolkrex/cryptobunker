// 'use client';
// import { AdminNavbar } from '@/components/admin/AdminNavbar';
// import { AdminSidebar } from '@/components/admin/AdminSidebar';
// import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import { getUserSession } from '@/server/actions/auth/register-actions';
import { redirect } from 'next/navigation';
import { AdminProvider } from "@/components/layouts/AdminProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard",
    icons: "/img/logo.ico"
}

export default async function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {

    const user = await getUserSession();

    if (!user) {
        return redirect('/login');
    }

    return (
        <>
            <AdminProvider>
                {children}
            </AdminProvider>
        </>
    )
}
// <PrimeReactProvider>
//     <UIProvider>

// <section className='min-h-[90vh]'>
{/* Include shared UI here e.g. a header or sidebar */ }
{/* <AdminNavbar />
            <div className="w-full flex">
                <AdminSidebar />
                <div className="w-full pt-24"> */}
{/* </div>
            </div>
        </section> */}
// <Footer />
//     </UIProvider>
// </PrimeReactProvider>