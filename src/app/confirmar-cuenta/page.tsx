"use client"
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

type tokenStatus = 'confirmed' | 'valid' | 'invalid' | 'loading'

const ConfirmPage = () => {
    const searchParams = useSearchParams();

    const [isTokenValid, setIsTokenValid] = useState<tokenStatus>("loading");

    console.log(searchParams)

    const token = searchParams.get('token')

    const isTokenValidFunction = async () => {
        const res = await fetch(`/api/validate/confirm?token=${ token }`)
        const data = await res.json()
        // console.log({ data })
        console.log(token)
        console.log(data)
        setIsTokenValid(data.status)
        if (data.status === "valid") {
            const signin = await signIn("credentials", {
                email: data.email,
                password: data.password,
                address: data.address || "",
                // redirect: false,
                redirect: true,
                callbackUrl: `/dashboard`,
            });
            // console.log({ signin })
        }
    }

    // useEffect(() => {
    //     // Perform any necessary actions with the token here

    //     isTokenValidFunction()
    //     console.log(token);
    // }, []);

    useMemo(() => {
        isTokenValidFunction()
        console.log(token)
    }, [token])

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
            <div className="bg-white p-8 shadow-md rounded-md w-full max-w-96">
                {
                    isTokenValid === "loading" ?
                        <div className="flex flex-col">
                            <p className="text-2xl">Cargando...</p>
                        </div>
                        : null
                }
                {
                    !token ?
                        <div className="flex flex-col">
                            <p className="text-2xl mb-3">No token provided</p>
                            <Link href="/login" className="text-white bg-yellow-500 hover:opacity-80 transition-opacity cursor-pointer ml-2 rounded-md py-3 flex justify-center gap-3 px-3 font-bold">
                                <span >
                                    Ir al Login
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevrons-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7l5 5l-5 5" /><path d="M13 7l5 5l-5 5" /></svg>
                            </Link>
                        </div>
                        :
                        <>
                            {
                                isTokenValid === "invalid" ?
                                    <div className="flex flex-col">
                                        <p className="text-2xl mb-3">Token inválido</p>
                                        <Link href="/login" className="text-white bg-yellow-500 hover:opacity-80 transition-opacity cursor-pointer ml-2 rounded-md py-3 flex justify-center gap-3 px-3 font-bold">
                                            <span >
                                                Ir al Login
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevrons-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7l5 5l-5 5" /><path d="M13 7l5 5l-5 5" /></svg>
                                        </Link>
                                    </div>
                                    : null
                            }
                        </>
                }
                {
                    isTokenValid === "valid" ?
                        <div className="flex flex-col gap-3">
                            <h1 className="text-2xl font-bold mb-4">Confirm Page</h1>
                            {/* <span className="text-wrap w-full border ">Token: {token}</span> */}
                            <div className="flex flex-col items-center text-green-600">
                                <span className="text-xl">
                                    Cuenta Confirmada
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /><path d="M15 19l2 2l4 -4" /></svg>
                            </div>
                            <Link href="/login" className="text-white bg-yellow-500 hover:opacity-80 transition-opacity cursor-pointer ml-2 rounded-md py-3 flex justify-center gap-3 px-3 font-bold">
                                <span >
                                    Ir al Login
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevrons-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7l5 5l-5 5" /><path d="M13 7l5 5l-5 5" /></svg>
                            </Link>
                        </div>
                        : null
                }
                {
                    isTokenValid === "confirmed" ?
                        <div className="flex flex-col">
                            <p className="text-2xl mb-3">Usuario ya confirmado</p>
                            <Link href="/login" className="text-white bg-yellow-500 hover:opacity-80 transition-opacity cursor-pointer ml-2 rounded-md py-3 flex justify-center gap-3 px-3 font-bold">
                                <span >
                                    Ir al Login
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevrons-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7l5 5l-5 5" /><path d="M13 7l5 5l-5 5" /></svg>
                            </Link>
                        </div>
                        : null
                }
            </div>
        </div>
    );
};

export default ConfirmPage;
