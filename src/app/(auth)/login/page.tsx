// import { FormLogin } from '@/components/auth/FormLogin';
import { FormLoginEmail } from '@/components/auth/FormLoginEmail';
import { authOptions } from '@/server/helpers/auth/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
// import React from 'react';

export default async function LoginPage() {

    const session = await getServerSession(authOptions)

    // if (session?.user) {
    //     console.log('user is logged');
    //     redirect('/admin')
    // }

    async function handleLogin() {
        "use server";
    }

    return (
        <div className="flex min-h-[850px] flex-col justify-center items-center bg-hero bg-cover bg-no-repeat bg-center 
        z-10
        relative
        overflow-hidden before:content-['']
        before:absolute
        before:inset-0
        before:block
        before:bg-gradient-to-r
        before:from-black
        before:to-black
        before:opacity-50
        before:z-[-5]">
            {/* <FormLogin /> */}
            <FormLoginEmail />
        </div>
    );
};
