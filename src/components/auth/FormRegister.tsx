"use client"
import dynamic from 'next/dynamic';
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form';

interface IFormRegister {
    handleRegister: (
        { email,
            password,
            confirmPassword }
            : {
                email: string,
                password: string,
                confirmPassword: string
            }
    ) => void
}

function FormRegister({ handleRegister }: IFormRegister) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = handleSubmit((data) => {
        handleRegister({
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
        });
    });

    return (

        <form
            onSubmit={onSubmit}
            className='flex flex-col items-center'>
            <h1 className="text-3xl text-center font-bold mb-4 text-white">
                Registrate en GoldMak
            </h1>
            <div className="w-64">
                <input
                    type="email"
                    placeholder="Email"
                    {
                    ...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            message: 'Invalid email address',
                        },
                    })
                    }
                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                />
                {
                    errors.email && (
                        <span className="text-red-500 mb-2">
                            {errors.email.message}
                        </span>
                    )
                }
                <input
                    type="password"
                    placeholder="Password"
                    {
                    ...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must have at least 6 characters',
                        },
                    })
                    }
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                />
                {
                    errors.password && (
                        <span className="text-red-500 mb-2">
                            {errors.password.message}
                        </span>
                    )
                }

                <input
                    type="password"
                    placeholder="Confirm Password"
                    {
                    ...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must have at least 6 characters',
                        },
                    })
                    }
                    className="border border-gray-300 rounded-md px-4 py-2 mb-2"
                />

                {
                    errors.confirmPassword && (
                        <span className="text-red-500 mb-2">
                            {errors.confirmPassword.message}
                        </span>
                    )
                }


                <button
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Register with Email
                </button>
                <button
                    className="w-full px-4 py-2 mt-2 bg-red-500 text-white rounded-md"
                >
                    Register with Gmail
                </button>
                {/* si no estas registrado, continua en el siguiente link */}
                <p className="mt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </form>
    )
}

export default dynamic(
    async () => FormRegister,
    {
        ssr: false,
        loading: () => <svg
            role="img"
            width="320"
            height="370"
            aria-labelledby="loading-aria"
            viewBox="0 0 320 370"
            preserveAspectRatio="none"
        >
            <title id="loading-aria">Loading...</title>
            <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                clip-path="url(#clip-path)"
                style={{ fill: "url(#fill)" }}
            ></rect>
            <defs>
                <clipPath id="clip-path">
                    <rect x="0" y="0" rx="0" ry="0" width="NaN" height="NaN" />
                    <rect x="7" y="110" rx="4" ry="4" width="308" height="31" />
                    <rect x="5" y="7" rx="0" ry="0" width="318" height="88" />
                    <rect x="5" y="157" rx="4" ry="4" width="308" height="31" />
                    <rect x="6" y="204" rx="4" ry="4" width="308" height="31" />
                    <rect x="7" y="254" rx="4" ry="4" width="308" height="31" />
                    <rect x="7" y="299" rx="4" ry="4" width="308" height="31" />
                </clipPath>
                <linearGradient id="fill">
                    <stop
                        offset="0.599964"
                        stop-color="#ababab"
                        stop-opacity="1"
                    >
                        <animate
                            attributeName="offset"
                            values="-2; -2; 1"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                        ></animate>
                    </stop>
                    <stop
                        offset="1.59996"
                        stop-color="#c7c7c7"
                        stop-opacity="1"
                    >
                        <animate
                            attributeName="offset"
                            values="-1; -1; 2"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                        ></animate>
                    </stop>
                    <stop
                        offset="2.59996"
                        stop-color="#ababab"
                        stop-opacity="1"
                    >
                        <animate
                            attributeName="offset"
                            values="0; 0; 3"
                            keyTimes="0; 0.25; 1"
                            dur="2s"
                            repeatCount="indefinite"
                        ></animate>
                    </stop>
                </linearGradient>
            </defs>
        </svg>
    }
)