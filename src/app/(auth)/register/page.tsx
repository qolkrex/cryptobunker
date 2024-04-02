import { FormKyc } from '@/components/auth/FormKyc';
// import FormRegister from '@/components/auth/FormRegister';
import React from 'react';

export default async function RegisterPage() {

    return (
        <>
            <div className="flex min-h-[850px] flex-col bg-hero bg-cover bg-no-repeat bg-center 
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
                <FormKyc />
            </div>
        </>
    );
};
