'use client'
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useFormState, useFormStatus } from 'react-dom';
import clsx from 'clsx';
import { authenticate } from '@/server/actions/auth/login-action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const FormLogin = () => {

    const [show, setShow] = useState(false)
    const [typeInput, setTypeInput] = useState("password")
    const [state, dispatch] = useFormState(authenticate, undefined)
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
    })

    useEffect(() => {
        if (state === 'Success') {
            // redireccionar
            router.replace('/dashboard');
            // window.location.replace('/admin');
        }

        if (state === "UserUnconfirmed") {
            toast.error("Cuenta no confirmada, revisa tu correo");
        }
        if (state === "UserInactive") {
            toast.error("Cuenta inactiva, contacta con el administrador");
        }

    }, [state]);

    console.log((state));

    return (
        <form
            action={dispatch}
            className="flex flex-col w-full max-w-[400px] bg-primary p-10">

            <h1 className="text-2xl font-bold mb-4 text-white">Logueate en GoldMak</h1>
            <label htmlFor="" className='flex flex-col'>
                <span className="text-white text-base">
                    Email
                </span>
                <input
                    type="email"
                    placeholder="Email"
                    {
                    ...register('email', {
                        required: 'Required',
                        pattern: {
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            message: "Email inválido"
                        },
                    })
                    }
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                />
                <span className="text-red-500 text-sm">
                    {errors.email?.message}
                </span>
            </label>
            <label htmlFor="" className='flex flex-col'>
                <span className="text-white text-base">
                    Password
                </span>
                <div className="w-full relative">
                    <input
                        type={typeInput}
                        placeholder="Password"
                        {
                        ...register('password', {
                            required: 'Required',
                            minLength: {
                                value: 6,
                                message: 'Tamaño mínimo de 6 caracteres',
                            },
                            // pattern: {
                            //     value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                            //     message: 'Debe contener al menos una letra y un número',
                            // },
                        })
                        }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-2"
                    />
                    {
                        show ?
                            <button
                                type="button"
                                className="absolute right-0 top-0 bg-transparent w-11 h-11 flex justify-center items-center rounded-md"
                                onClick={() => {
                                    setShow(!show)
                                    setTypeInput("text")
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                            </button>
                            :
                            <button
                                type="button"
                                className="absolute right-0 top-0 bg-transparent w-11 h-11 flex justify-center items-center rounded-md"
                                onClick={() => {
                                    setShow(!show)
                                    setTypeInput("password")
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>

                            </button>
                    }
                </div>
                <span className="text-red-500 text-sm">
                    {errors.email?.message}
                </span>
            </label>

            {
                state === "CredentialsSignin" &&
                <div className='mb-2'>
                    <p className="text-red-500 text-sm mt-2">
                        Credenciales Inválidas
                    </p>
                </div>
            }

            <LoginButton />
            {/* <button
                type='button'
                className="bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2 mt-2 flex items-center justify-center gap-2"
            >
                <span>
                    Login with Gmail
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-google-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" strokeWidth="0" fill="currentColor" /></svg>
            </button> */}

            {/* si no estas registrado, continua en el siguiente link */}

            <p className="mt-4">
                Don't Already have an account?{' '}
                <Link href="/register" className="text-blue-600">
                    Register
                </Link>
            </p>

            <div className='mt-2 h-1 bg-white bg-opacity-60' />

            {/* olvidaste tu constraseña */}
            <p className="mt-2 text-end">
                <Link href="/forgot-password" className="text-blue-600">
                    Forgot Password
                </Link>
            </p>
        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type='submit'
            disabled={pending}
            className={clsx({
                "": !pending,
                "opacity-30 bg-gray-800": pending
            }, "bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2")}
        >
            {
                pending ?
                    <span className='flex gap-3 justify-center'>
                        Cargando
                        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a9 9 0 1 0 9 9" /></svg>
                    </span>
                    :
                    <span>
                        Login
                    </span>
            }
        </button>
    );
}