import Image from 'next/image'
import React from 'react'
import ButtonBase from '../common/buttons/ButtonBase'
import { Accordion } from './Accordion'

export const Faq = () => {
    return (
        <section className='relative flex flex-col items-center w-full py-24 gap-16 bg-black px-4 min-h-[80sh] max-w-9xl mx-auto'
            id="faq"
        >
            <h1
                className='text-4xl font-semibold text-white font-paragraph'
            >
                ¿Tienes alguna duda?
            </h1>
            <Image
                src='/img/search.png'
                alt='faq'
                width={500}
                height={500}
                className='absolute top-0 right-0 '
            />
            {/* 
            <form className="flex flex-col md:flex-row items-center gap-5 mt-10 bg-white rounded-md">
                <input type="text" placeholder="¿Tienes alguna duda?" className="w-full md:w-[600px] h-16 rounded-md border border-transparent px-4 py-5"></input>
                <ButtonBase
                    type='submit'
                    variant={"alert"} className='w-full flex justify-center items-center gap-5 max-w-[250px] py-4 text-lg font-semibold text-black bg-primary rounded-md hover:bg-warning my-2 mr-2 z-10 font-paragraph'
                >
                    ENVIAR
                </ButtonBase>
            </form> */}

            {/* <div className="flex flex-col gap-3 max-w-4xl mx-auto">
                <h1 className='text-xl md:text-7xl font-semibold text-white font-title text-balance'
                    style={{
                        letterSpacing: '0.05em'
                    }}
                >
                    PREGUNTAS F.A.Q
                </h1>

                <div className="flex flex-col w-full bg-white py-8 px-8 rounded-md font-paragraph">
                    <h2 className='font-semibold'>
                        ¿Cuáles son los medios de uso para token GMK?
                    </h2>
                    <p>
                        GMK se utiliza para comprar maquinaria pesada, alquiler equipos, entrar a eventos, trabajos y mucho más.
                    </p>
                </div>
                <div className="flex flex-col w-full bg-white py-8 px-8 rounded-md font-paragraph">
                    <h2 className='font-semibold'>
                        ¿Cuáles son los beneficios de usar la token GMK?
                    </h2>
                    <p>
                        La principal utilidad del token GMK es permitirle comprar o alquilar maquinaria pesada o servicios de construcción a un precio de descuento. Nuestra comunidad de socios que aceptan el token ofrece una variedad de servicios como educación, eventos y empleos a los poseedores del token.
                    </p>
                </div>
                <div className="flex flex-col w-full bg-white py-8 px-8 rounded-md font-paragraph">
                    <h2 className='font-semibold'>
                        ¿Cómo puedo adquirir GMK por primera vez?
                    </h2>
                    <p>
                        Adquiere tus tokens aquí en la página web.
                    </p>
                </div>
                <div className="flex flex-col w-full bg-white py-8 px-8 rounded-md font-paragraph">
                    <h2 className='font-semibold'>
                        ¿Puedo vender GMK en cualquier momento?
                    </h2>
                    <p>
                        Sí, como cualquier token en la blockchain uno puede ponerlo en venta y el mercado descentralizado podría comprarlo.
                    </p>
                </div>
                <div className="flex flex-col w-full bg-white py-8 px-8 rounded-md font-paragraph">
                    <h2 className='font-semibold'>
                        ¿Qué sucede si pierdo acceso a mi billetera de GMK?
                    </h2>
                    <p>
                        Es crucial mantener un respaldo seguro de tus claves privadas. Si pierdes acceso, comunícate con el soporte técnico para obtener asistencia. ¡La seguridad es nuestra prioridad!
                    </p>
                </div>
            </div> */}

            <div className="relative flex justify-center w-full md:h-[700px] h-auto mt-24">

                <Image
                    // src='/img/gameboy_faq.webp'
                    src='/img/gameboy_faq.png'
                    alt='faq'
                    width={1500}
                    height={1200}
                    className='mx-auto absolute h-[850px] w-[1300px] bottom-0 z-10 -translate-x-1/2 left-1/2 hidden md:block'
                />
                <div className="relative -top-4 md:top-16 md:-left-16 left-0 z-20 w-full md:max-w-lg lg:max-w-xl xl:max-w-3xl">
                    <Accordion />
                </div>
            </div>

        </section>
    )
}
