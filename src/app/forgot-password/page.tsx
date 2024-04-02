import { FormForgotPassword } from '@/components/auth/FormForgotPassword';
import React from 'react';

const ForgotPasswordPage: React.FC = () => {
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
        before:z-[-5]
        ">
            <FormForgotPassword />
        </div>
    );
};

export default ForgotPasswordPage;
