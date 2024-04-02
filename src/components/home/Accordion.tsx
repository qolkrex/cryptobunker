'use client';
import React, { FC, useState } from 'react'

interface AccordionItem {
    faq: Faq
}

interface Faq {
    value: number;
    question: string;
    answer: JSX.Element
}
export const Accordion = () => {

    const [selectedRadio, setSelectedRadio] = useState<number | null>(null);

    const handleRadioChange = (value: number) => {
        setSelectedRadio(value === selectedRadio ? null : value);
    };

    const faqData: Faq[] = [
        {
            value: 1,
            question: '¿Qué sucede si pierdo acceso a mi billetera de GMK?',
            answer: <span className='text-justify'>Es crucial mantener un respaldo seguro de tus claves privadas.<br /> Si pierdes acceso, comunícate a contacto@goldmak.com.<br /> ¡La seguridad es nuestra prioridad!</span>,
        },
        {
            value: 2,
            question: '¿Cómo puedo adquirir GMK por primera vez?',
            answer: <span className='text-justify'>Adquiere tus tokens aquí en nuestra página web luego de registrarte en la plataforma.</span>,
        },
        {
            value: 3,
            question: '¿Puedo vender GMK en cualquier momento?',
            answer: <span className='text-justify'>Sí, como cualquier token en la blockchain, tienes la capacidad de ponerlo en venta y el mercado descentralizado podría comprarlo.</span>,
        },
        {
            value: 4,
            question: '¿Cuáles son los beneficios de usar la token GMK?',
            answer: <span className='text-justify'>La principal utilidad del token GMK es permitir la comprar o alquiler de maquinaria pesada o servicios de construcción a un precio de descuento. <br />Nuestros socios que aceptan el token ofrece una variedad de servicios como educación, eventos y empleo a los poseedores del token. Además, participarás de eventos exclusivos para token holders.</span>,
        },
        {
            value: 5,
            question: 'Goldmak en la red de Optimism',
            answer: <ul>
                <li>
                    - Símbolo: GMK
                </li>
                <li>
                    - Suministro máximo: 25 millones
                </li>
                <li>
                    - Estándar: ERC-20
                </li>
                <li>
                    - Precio inicial: 0.4 USD
                </li>
            </ul>
        },
        // {
        //     value: 4,
        //     question: '¿Cómo toma valor la token GMK y cuáles son sus fundamentales?',
        //     answer: 'Una token ERC-20 es un estándar técnico utilizado en la red Ethereum para crear tokens fungibles, lo que significa que son intercambiables entre sí y tienen el mismo valor.',
        // },
        // {
        //     value: 5,
        //     question: '¿Cuáles son los beneficios de usar la token GMK?',
        //     answer: 'Una token ERC-20 es un estándar técnico utilizado en la red Ethereum para crear tokens fungibles, lo que significa que son intercambiables entre sí y tienen el mismo valor.',
        // },
    ];

    return (
        <div className="flex flex-col gap-0 max-w-3xl max-h-[800px] md:max-h-[400px] overflow-y-auto w-full scrollbar">
            {faqData.map((faq) => (
                <AcoordionItem
                    key={faq.value}
                    faq={faq}
                />
                // <div key={faq.value} className="faq-item">
                //     <label
                //         className={`flex justify-between bg-[#f7a813] py-4 px-5 max-w-2xl md:text-lg xl:text-2xl hover:cursor-pointer ${ selectedRadio === faq.value ? 'active' : ''
                //             }`}
                //         onClick={
                //             () => console.log(faq.value)
                //         }
                //     >
                //         <span>{faq.question}</span>
                //         {
                //             selectedRadio === faq.value ? (
                //                 <svg
                //                     xmlns="http://www.w3.org/2000/svg"
                //                     className="icon icon-tabler icon-tabler-chevron-up"
                //                     width="24"
                //                     height="24"
                //                     viewBox="0 0 24 24"
                //                     strokeWidth="2"
                //                     stroke="currentColor"
                //                     fill="none"
                //                     strokeLinecap="round"
                //                     strokeLinejoin="round"
                //                 >
                //                     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                //                     <path d="M6 15l6 -6l6 6" />
                //                 </svg>
                //             ) : (
                //                 <svg
                //                     xmlns="http://www.w3.org/2000/svg"
                //                     className="icon icon-tabler icon-tabler-chevron-down"
                //                     width="24"
                //                     height="24"
                //                     viewBox="0 0 24 24"
                //                     strokeWidth="2"
                //                     stroke="currentColor"
                //                     fill="none"
                //                     strokeLinecap="round"
                //                     strokeLinejoin="round"
                //                 >
                //                     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                //                     <path d="M6 9l6 6l6 -6" />
                //                 </svg>
                //             )
                //         }
                //         <input
                //             type="radio"
                //             className="hidden"
                //             name="faq"
                //             value={faq.value}
                //             checked={selectedRadio === faq.value}
                //             onChange={() => handleRadioChange(faq.value)}
                //         />
                //     </label>
                //     <div className={`md:text-xl xl:text-2xl pt-4 transition-[height] bg-white xl:bg-transparent ${ selectedRadio === faq.value ? 'show h-[250px] min-h-[250px]' : 'h-0 overflow-hidden' }`}>
                //         <span className="xl:text-white ">{faq.answer}</span>
                //     </div>
                // </div>
            ))}
        </div>
    )
}

const AcoordionItem: FC<AccordionItem> = ({ faq }) => {
    const [show, setShow] = useState(false)
    return (
        <div className="faq-item px-5 md:px-0 w-full">
            <label className={`w-full flex justify-between bg-[#f7a813] py-4 px-5 max-w-3xl md:text-lg xl:text-2xl hover:cursor-pointer ${ show ? 'active' : '' }`}>
                <span>
                    {
                        faq.question
                    }
                </span>
                {
                    show ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-chevron-up"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M6 15l6 -6l6 6" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-chevron-down"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M6 9l6 6l6 -6" />
                        </svg>
                    )
                }
                <input
                    type="checkbox"
                    className="hidden"
                    name="faq"
                    value="1"
                    onChange={() => setShow(!show)}
                />
            </label>
            <div className={`md:text-xl xl:text-2xl pt-4 transition-[height] bg-transparent px-4 md:px-0 text-white ${ show ? 'show h-[250px] min-h-[250px]' : 'h-0 overflow-hidden' }`}>
                {/* <span className="text-white ">
                    <Answer />
                </span> */}
                {
                    faq.answer
                }
            </div>
            {/* <div className={`md:text-xl xl:text-2xl pt-4 transition-[height] bg-white xl:bg-transparent px-4 md:px-0 ${ show ? 'show h-[250px] min-h-[250px]' : 'h-0 overflow-hidden' }`}>
                <span className="xl:text-white ">{faq.answer}</span>
            </div> */}
        </div>
    )
}