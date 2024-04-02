import ButtonBase from "@/components/common/buttons/ButtonBase";
import Image from "next/image";

export default function StakePage() {
    return (
        <div className='px-12 py-14 flex justify-center'>
            <div className="flex flex-col border bg-[#414141] px-4 py-5 max-w-[831px] w-full">
                <div className="flex w-full gap-3">
                    <div className="flex flex-col w-1/2 gap-4">
                        <div className="flex">
                            <Image
                                src="/img/encabezado/g-token.png"
                                alt="swap"
                                width={50}
                                height={50}
                                className="w-20 h-20 object-contain z-10"
                            />

                            Agregar GMK
                        </div>

                        <div className="w-full py-5 px-10 min-h-24 bg-[#676767] rounded-xl">
                            <div className="flex justify-between">
                                <span className="text-white">
                                    000
                                </span>
                                <span>
                                    Equivalente: 0
                                </span>
                            </div>
                            <span>
                                -0000.00 USD
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button className="px-5 py-3 bg-transparent border rounded-full">
                                25%
                            </button>
                            <button className="px-5 py-3 bg-transparent border rounded-full">
                                50%
                            </button>
                            <button className="px-5 py-3 bg-transparent border rounded-full">
                                75%
                            </button>
                            <button className="px-5 py-3 bg-transparent border rounded-full">
                                Max
                            </button>
                        </div>
                    </div>

                    
                </div>
                <div className="mt-5 flex flex-col">
                    <span className="text-xl font-semibold">
                        Descripción general:
                    </span>
                    <div className="flex justify-between gap-3 bg-[#676767] py-5 px-10 my-3 rounded-xl">
                        <span>
                            <Image
                                src="/img/encabezado/g-token.png"
                                alt="swap"
                                width={50}
                                height={50}
                                className="w-20 h-20 object-contain z-10"
                            />
                            mi GMK
                        </span>
                        <span className="font-semibold">0</span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <span className="font-semibold">
                                GMK Bloqueada
                            </span>
                            <span className="font-semibold">
                                100
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">
                                Factoria
                            </span>
                            <span className="font-semibold">
                                0.00x
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">
                                Duración
                            </span>
                            <span className="font-semibold">
                                000 semanas
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">
                                Desbloquear en
                            </span>
                            <span className="font-semibold">
                                XXX 00 000 000
                            </span>
                        </div>
                        <ButtonBase variant={"alert"}
                            className="mx-auto"
                        >
                            CERRAR GMK
                        </ButtonBase>
                    </div>
                </div>
            </div>

        </div>
    )
}

{/* <div className="flex flex-col w-1/2 gap-4">
                        <div className="flex">
                            <Image
                                src="/img/encabezado/g-token.png"
                                alt="swap"
                                width={50}
                                height={50}
                                className="w-20 h-20 object-contain z-10"
                            />

                            Duración
                        </div>

                        <div className="w-full py-5 px-10 min-h-24 bg-[#676767] rounded-xl">
                            <div className="flex justify-between">
                                <span className="text-white">
                                    000
                                </span>
                                <span>
                                    Semanas
                                </span>
                            </div>
           
                            </div>

                            <div className="flex gap-2">
                                <button className="px-5 py-3 bg-transparent border rounded-full">
                                    1S
                                </button>
                                <button className="px-5 py-3 bg-transparent border rounded-full">
                                    1M
                                </button>
                                <button className="px-5 py-3 bg-transparent border rounded-full">
                                    6M
                                </button>
                                <button className="px-5 py-3 bg-transparent border rounded-full">
                                    1A
                                </button>
                                <button className="px-5 py-3 bg-transparent border rounded-full">
                                    4A
                                </button>
                            </div>
                        </div> */}

                        {/* <span>
                                -0000.00 USD
</span> */}

<div className="flex flex-col w-1/2 gap-4">
                        <div className="flex">
                            <Image
                                src="/img/encabezado/g-token.png"
                                alt="swap"
                                width={50}
                                height={50}
                                className="w-20 h-20 object-contain z-10"
                            />

                            Duración
                        </div>

                        <div className="w-full py-5 px-10 min-h-24 bg-[#676767] rounded-xl">
                            <div className="flex justify-between">
                                <span className="text-white">
                                    000
                                </span>
                                <span>
                                    Semanas
                                </span>
                            </div>
                            {/* <span>
                                -0000.00 USD
                            </span> */}
                        </div>

                        <div className="flex gap-2">
                            <button className="px-5 py-3 bg-transparent border rounded-full">
                                1S
                            </button>
                            <button className="px-5 py-3 bg-transparent border rounded-full">
                                1M
                            </button>
                            <button className="px-5 py-3 bg-transparent border rounded-full">
                                6M
                            </button>
                            <button className="px-5 py-3 bg-transparent border rounded-full">
                                1A
                            </button>
                            <button className="px-5 py-3 bg-transparent border rounded-full">
                                4A
                            </button>
                        </div>
                    </div>