import { Footer } from "@/components/common/Footer";
import { Navbar } from "@/components/common/Navbar";
import { authOptions } from "@/server/helpers/auth/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function HomeLayout({ children }: { children: React.ReactNode }) {

    // const session = await getServerSession(authOptions)

    // console.log({ session });

    // if (session?.user) {
    //     console.log('user is logged');
    //     redirect('/admin')
    // }

    return <>
        <Navbar />
        {children}
        <Footer />
    </>
}