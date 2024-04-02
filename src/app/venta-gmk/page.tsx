'use client'
import { useState } from "react";
import { ButtonConnect } from "@/components/common/ButtonConnect";
import { ButtonSimple } from "@/components/common/ButtonSimple";
import Image from "next/image";
import { HomeLayout } from "@/components/layouts/HomeLayout";
import { Board } from "@/components/common/swap/Board";
import { useReserves } from "@/hooks/useReserves";

export default function SellPage() {

    const [openModalConnect, setOpenModalConnect] = useState(false);
    const [slipage, setSlipage] = useState(10);
    const [open, setOpen] = useState(false);
    const { reserves, handleReserves } = useReserves();

    return (
        <HomeLayout>
            <section className="flex flex-col items-center justify-center min-h-screen py-2 relative">
                {/* <h1 className="text-6xl font-bold text-center text-primary">Sell Page</h1> */}
                <div className="absolute z-10 w-full h-full top-0">
                    <div className="relative w-full h-full">
                        {/* Fondo de degradado */}
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-45 z-20" />

                        {/* Imagen */}
                        <Image
                            src="/img/section_sell.webp"
                            alt="1"
                            width={1000}
                            height={800}
                            className="absolute w-full h-full object-cover z-10"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center w-full max-w-7xl min-h-[800px] z-20">
                    <div className="w-full flex flex-col justify-start mb-10 max-w-7xl backdrop-blur-sm bg-white/30 min-h-[800px] px-12 py-12">
                        <div className="flex justify-between gap-4">
                            <div className="flex gap-4">
                                <ButtonSimple content="FIAT" />
                                <ButtonSimple content="TOKENS" />
                            </div>
                            {/* <ButtonSimple content="Connect Wallet" /> */}
                            <ButtonConnect
                                openModal={openModalConnect}
                                setOpenModal={setOpenModalConnect}
                            />
                            {/* <button className="flex items-center justify-center  h-14 bg-primary rounded-md text-black font-bold text-xl px-10">
                            Connect Wallet
                        </button> */}
                        </div>
                        <span className='mt-5 text-center text-3xl font-semibold text-white'>
                            ADQUISICIÓN DE GOLDMAK:
                        </span>
                        <Board slipage={slipage} setOpen={setOpen} reserves={reserves} />
                    </div>
                </div>
            </section>
        </HomeLayout>
    )
}