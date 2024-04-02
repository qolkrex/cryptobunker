'use client';
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form';

export const Contact = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        getValues,
    } = useForm();

    const regexNum = /^[0-9]+/;
    const regexText = /^[a-zA-Z0-9 ]+$/;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const link = useRef<HTMLAnchorElement>(null);

    return (
        <section className='flex flex-col items-center justify-start w-full py-24  px-4 relative overflow-hidden min-h-[800px]'>
            <div className="flex flex-col w-full max-w-7xl">
                <span className='text-4xl font-semibold text-black'>
                    Suscribete para más información
                </span>
                <div className="flex flex-col md:flex-row gap-5 mt-10">
                    <input type="text" placeholder="Nombre" className="w-full md:w-[600px] h-16 rounded-md border border-gray-300 px-4 py-5" />
                    <input type="text" placeholder="Correo" className="w-full md:w-[600px] h-16 rounded-md border border-gray-300 px-4 py-5" />
                </div>
                <div className="flex flex-col md:flex-row gap-5 mt-10">
                    <input type="text" placeholder="Teléfono" className="w-full md:w-[600px] h-16 rounded-md border border-gray-300 px-4 py-5" />
                    <input type="text" placeholder="Servicio" className="w-full md:w-[600px] h-16 rounded-md border border-gray-300 px-4 py-5" />
                </div>
                <div className="flex flex-col md:flex-row gap-5 mt-10">
                    <input type="text" placeholder="Mensaje" className="w-full md:w-[1220px] h-20 rounded-md border border-gray-300 px-4 py-5" />
                </div>
                <div className="flex flex-col md:flex-row gap-5 mt-10">
                    <label htmlFor="" className='flex items-center gap-3'>
                        <input type="checkbox" placeholder="" className="px-4 py-5 size-12" />
                        <span className='text-2xl font-semibold text-black'>
                            Acepto los términos y condiciones
                        </span>
                    </label>
                </div>
                {/* <button className='w-full flex justify-center items-center gap-5 max-w-[350px] py-4 mt-8 text-lg font-semibold text-black bg-primary rounded-md hover:bg-warning'>
                    <span>
                        ENVIAR
                    </span>
                    <svg width="34" height="16" viewBox="0 0 34 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.7071 8.70711C34.0976 8.31658 34.0976 7.68342 33.7071 7.29289L27.3431 0.928932C26.9526 0.538408 26.3195 0.538408 25.9289 0.928932C25.5384 1.31946 25.5384 1.95262 25.9289 2.34315L31.5858 8L25.9289 13.6569C25.5384 14.0474 25.5384 14.6805 25.9289 15.0711C26.3195 15.4616 26.9526 15.4616 27.3431 15.0711L33.7071 8.70711ZM0 9H33V7H0V9Z" fill="black" />
                    </svg>

                </button> */}
                <a href={`mailto:contacto@goldmak?subject=${ "Contacto desde la web" }&body=Nombre: ${ getValues("name") }%0D%0AEmail: ${ getValues("email") }%0D%0ATelefono: ${ getValues("phone") }%0D%0ADetalle: ${ getValues("detail") }
                    `}
                    ref={link}
                    className="w-full flex justify-center items-center gap-5 max-w-[350px] py-4 mt-8 text-lg font-semibold text-black bg-primary rounded-md hover:bg-warning">
                    <span>
                        ENVIAR
                    </span>
                    <svg width="34" height="16" viewBox="0 0 34 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M33.7071 8.70711C34.0976 8.31658 34.0976 7.68342 33.7071 7.29289L27.3431 0.928932C26.9526 0.538408 26.3195 0.538408 25.9289 0.928932C25.5384 1.31946 25.5384 1.95262 25.9289 2.34315L31.5858 8L25.9289 13.6569C25.5384 14.0474 25.5384 14.6805 25.9289 15.0711C26.3195 15.4616 26.9526 15.4616 27.3431 15.0711L33.7071 8.70711ZM0 9H33V7H0V9Z" fill="black" />
                    </svg>
                </a>
            </div>
        </section>
    )
}
