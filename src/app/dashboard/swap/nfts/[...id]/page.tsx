"use client"
import React from 'react';
import Image from 'next/image';
import ButtonBase from '@/components/common/buttons/ButtonBase';
import { useRouter } from 'next/navigation';

const NFTDetailPage: React.FC = () => {
    const router = useRouter();
    return (
        <div className="flex pt-10 justify-center px-10">
            <div className="bg-transparent shadow-lg rounded-lg p-6 w-full max-w-6xl">
                <button className="flex items-center gap-2 mb-5 font-semibold"
                    onClick={() => router.back()}
                >
                    {"< Atrás"}
                </button>
                <h1 className="text-2xl font-bold mb-4">NFT Detail</h1>

                {/* Add your NFT details here */}
                <div className="flex flex-row flex-wrap">
                    <div className="bg-gray-600 rounded-xl max-w-[500px] max-h-[500px] w-full h-[500px] flex justify-center items-center gap-5">
                        <Image
                            src="/img/encabezado/g-token.png"
                            alt="swap"
                            width={50}
                            height={50}
                            className="w-20 h-20 object-contain z-10"
                        />

                    </div>
                    <div className="flex flex-col px-10 gap-4 w-full max-w-[470px] mt-10 md:mt-0">
                        <span className='mb-5'>Información</span>

                        <div className="flex justify-between">
                            <span>
                                Nombre
                            </span>
                            <span>
                                Nombre del Nft
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Descripción
                            </span>
                            <span>
                                Desripción del nft
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Propietarios
                            </span>
                            <div className="flex">
                                <button className='border px-2 py-2'>
                                    Transfer
                                </button>
                                <button className='border px-2 py-2'>
                                    Quemable
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Editora
                            </span>
                            <span>Nombre de la editora</span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Cantidad
                            </span>
                            <span>1</span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Dueño
                            </span>
                            <span>Código del dueño</span>
                        </div>
                        <ButtonBase variant={"alert"}
                        >Pagar</ButtonBase>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NFTDetailPage;
