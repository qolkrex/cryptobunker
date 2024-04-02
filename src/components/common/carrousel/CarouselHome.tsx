"use client"

import { Exo_2 } from 'next/font/google';
import Image from 'next/image';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

export const CarouselHome = () => {
    return (
        <Swiper
            spaceBetween={0}
            // slidesPerView={3}
            centeredSlides

            breakpoints={{
                0: {
                    slidesPerView: 1,
                },
                700: {
                    slidesPerView: 3,
                },
                1300: {
                    slidesPerView: 4,
                },
                1600: {
                    slidesPerView: 6,
                },
                1900: {
                    slidesPerView: 7,
                },
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {/* card */}
            <SwiperSlide className='flex flex-col w-full h-full relative md:min-w-[450px]'>
                {/* <div className="flex flex-col w-full h-full relative md:min-w-[450px]"
                > */}
                <div className="absolute top-0 left-0 w-full">
                    <div className="relative md:w-[450px] h-[500px]">
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65 z-20" />
                        <Image
                            src="/img/carrusel/ecosistema.webp"
                            alt="1"
                            width={600}
                            height={600}
                            className="absolute w-full h-full object-cover z-10"
                        />
                    </div>
                </div>
                <div className="md:w-[450px] min-h-[500px] pt-8 flex flex-col items-center relative z-30 top-0 left-0 text-center border border-transparent hover:border-2 hover:border-yellow-400 hover:cursor-pointer font-paragraph ">
                    <p className='mt-6 text-balance text-2xl font-semibold text-primary h-16 
                  '>
                        Ecosistema financiero de la construcción
                    </p>
                    <p className='mt-6 text-balance w-[300px] h-40 text-white font-semibold pt-2'>
                        Hemos creado un ecosistema para permitir la compra y venta de maquinaria pesada accesible gracias a la ejecución de contratos inteligentes. Goldmak brinda transparencia, eficiencia y seguridad financiera para actividades de construcción. Un espacio para adquirir activos inmobiliarios y crear una experiencia directa y accesible para todos.
                    </p>
                </div>
                {/* </div> */}
            </SwiperSlide>

            {/* card */}
            <SwiperSlide className='flex flex-col w-full h-full relative md:min-w-[450px]'>
                {/* <div className=""> */}
                <div className="absolute top-0 left-0 w-full">
                    <div className="relative md:w-[450px] h-[500px]">
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65 z-20" />
                        <Image
                            src="/img/carrusel/acerca.webp"
                            alt="1"
                            width={600}
                            height={600}
                            className="absolute w-full h-full object-cover z-10"
                        />
                    </div>
                </div>
                <div className="md:w-[450px] min-h-[500px] pt-8 flex flex-col items-center relative z-30 top-0 left-0 text-center border-0 border-transparent hover:border-2 hover:border-yellow-400 hover:cursor-pointer font-paragraph">
                    <p className='mt-6 text-balance text-2xl font-semibold text-primary h-16'>
                        Acerca de Goldmak (GMK)
                    </p>
                    <p className='mt-6 text-balance w-[300px] h-40 text-white font-semibold pt-2'>
                        Goldmak (GMK) es la criptomoneda que redefine el paisaje financiero de la construcción, fusionando la innovación tecnológica de las criptomonedas con la robustez del sector de la construcción. Diseñada sobre el estándar ERC-20 de Ethereum, GMK no es simplemente una token, sino el catalizador de una revolución en el comercio para aquellos que dan forma al futuro urbano.
                    </p>
                </div>
                {/* </div> */}
            </SwiperSlide>

            {/* card */}
            <SwiperSlide className='flex flex-col w-full h-full relative md:min-w-[450px]'>
                {/* <div className="flex flex-col w-full h-full relative md:min-w-[450px]"> */}
                <div className="absolute top-0 left-0 w-full">
                    <div className="relative md:w-[450px] h-[500px]">
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65 z-20" />
                        <Image
                            src="/img/carrusel/innovacion.webp"
                            alt="1"
                            width={600}
                            height={600}
                            className="absolute w-full h-full object-cover z-10"
                        />
                    </div>
                </div>
                <div className="md:w-[450px] min-h-[500px] pt-8 flex flex-col items-center relative z-30 top-0 left-0 text-center border-0 border-transparent hover:border-2 hover:border-yellow-400 hover:cursor-pointer font-paragraph">
                    <p className='mt-6 text-balance text-2xl font-semibold text-primary h-16'>
                        Innovación en la Construcción
                    </p>
                    <p className='mt-6 text-balance w-[300px] h-40 text-white font-semibold pt-2'>
                        GMK permite a los usuarios adquirir maquinaria pesada, alquiler equipos, participar en transacciones dentro de un ecosistema financiero diseñado específicamente para la construcción. Facilitamos la entrada a un mercado que anteriormente estaba marcado por complejidades y barreras.
                    </p>
                </div>
                {/* </div> */}
            </SwiperSlide>

            {/* card */}
            <SwiperSlide className='flex flex-col w-full h-full relative md:min-w-[450px]'>
                {/* <div className=""> */}
                <div className="absolute top-0 left-0 w-full">
                    <div className="relative md:w-[450px] h-[500px]">
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65 z-20" />
                        <Image
                            src="/img/carrusel/nuestra-vision.webp"
                            alt="1"
                            width={600}
                            height={600}
                            className="absolute w-full h-full object-cover z-10"
                        />
                    </div>
                </div>
                <div className="md:w-[450px] min-h-[500px] pt-8 flex flex-col items-center relative z-30 top-0 left-0 text-center border-0 border-transparent hover:border-2 hover:border-yellow-400 hover:cursor-pointer font-paragraph">
                    <p className='mt-6 text-balance text-2xl font-semibold text-primary h-16'>
                        Nuestra visión
                    </p>
                    <p className='mt-6 text-balance w-[300px] h-40 text-white font-semibold pt-2'>
                        En Goldmak, visualizamos un futuro donde la construcción y las finanzas convergen de manera armoniosa, creando un puente digital que impulsa la evolución de ciudades más inteligentes y sostenibles. Creemos en un mundo donde la inversión en la construcción es accesible para todos, y GMK es la llave para desbloquear ese potencial.
                    </p>
                </div>
                {/* </div> */}
            </SwiperSlide>

            <SwiperSlide className='flex flex-col w-full h-full relative md:min-w-[450px]'>

                {/* card */}
                {/* <div className=""> */}
                <div className="absolute top-0 left-0 w-full">
                    <div className="relative md:w-[450px] h-[500px]">
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-65 z-20" />
                        <Image
                            src="/img/carrusel/eficiencia.webp"
                            alt="1"
                            width={600}
                            height={600}
                            className="absolute w-full h-full object-cover z-10"
                        />
                    </div>
                </div>
                <div className="md:w-[450px] min-h-[500px] pt-8 flex flex-col items-center relative z-30 top-0 left-0 text-center border-0 border-transparent hover:border-2 hover:border-yellow-400 hover:cursor-pointer font-paragraph">
                    <p className='mt-6 text-balance text-2xl font-semibold text-primary h-16'>
                        Eficiencia y Transparencia
                    </p>
                    <p className='mt-6 text-balance w-[300px] h-40 text-white font-semibold pt-2'>
                        Con GMK, la eficiencia y la transparencia son nuestras piedras angulares. Las transacciones rápidas y seguras se combinan con la visibilidad total, permitiendo a los participantes en el ecosistema tomar decisiones informadas y avanzar hacia el futuro con confianza.
                    </p>
                </div>
                {/* </div> */}
            </SwiperSlide>

        </Swiper>
    )
}
