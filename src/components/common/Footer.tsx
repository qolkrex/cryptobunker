import Link from "next/link";
import React from "react";
import ButtonTop from "./ButtonTop";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="bg-black">
      {/* <footer className="bg-primary rounded-t-[50px]"> */}
      <footer className="bg-primary ">
        <div className="mx-auto w-full max-w-screen-xl px-4 py-8 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0 flex flex-col text-center">
              <Link href="https://flowbite.com/" className=" w-full ">
                <span
                  className=" text-3xl md:text-4xl text-center font-semibold whitespace-nowrap dark:text-white font-title"
                  style={{
                    letterSpacing: "0.5rem",
                  }}
                >
                  CONTACTANOS
                </span>
              </Link>
              <div className="flex gap-10 py-3 justify-evenly md:justify-normal">
                <Link
                  href="https://www.tiktok.com/@goldmakoficial"
                  target="_blank"
                  className="flex items-center"
                >
                  {/* <Image
                                        src={'/img/pie_de_pagina/icon-fb.png'}
                                        alt="logo"
                                        width={30}
                                        height={30}
                                    /> */}
                  <Image
                    src={"/img/pie_de_pagina/icon-tiktok.png"}
                    alt="logo"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link
                  href="https://www.instagram.com/goldmak.oficial/"
                  target="_blank"
                  className="flex items-center"
                >
                  <Image
                    src={"/img/pie_de_pagina/icon-instagram.png"}
                    alt="logo"
                    width={30}
                    height={30}
                  />
                </Link>
                <Link
                  href="https://www.youtube.com/channel/UCnb2wGx6aRrLq8lneCIUVZg"
                  target="_blank"
                  className="flex items-center text-white "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-brand-youtube"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
                    <path d="M10 9l5 3l-5 3z" />
                  </svg>
                </Link>
                <Link
                  href="https://twitter.com/goldmakoficial"
                  target="_blank"
                  className="flex items-center"
                >
                  <Image
                    src={"/img/pie_de_pagina/icon-x.png"}
                    alt="logo"
                    width={30}
                    height={30}
                  />
                </Link>
              </div>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:flex-row md:gap-20   gap-8  ">
              <div>
                <h2 className="mb-6 text-sm md:font-bold md:text-xl font-semibold text-gray-900 uppercase dark:text-white">
                  Recursos
                </h2>
                <ul className="text-black flex flex-col gap-3">
                  {/* <li className="">
                                        <Link href="/#about" className="hover:underline">Acerca de</Link>
                                    </li> */}
                  <li>
                    <Link href="/#benefits" className="hover:underline">
                      Beneficios
                    </Link>
                  </li>
                  <li>
                    <Link href="/#faq" className="hover:underline">
                      Usos de GMK
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm md:font-bold md:text-xl font-semibold text-gray-900 uppercase dark:text-white">
                  Correo
                </h2>
                <ul className="text-black">
                  <li className="mb-4">
                    <Link href="/" className="hover:underline ">
                      contacto@goldmak.io
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-white sm:text-center ">
              © 2023 Goldmak. All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <span className="text-sm text-white sm:text-center ">
                Developed by the
                <Link
                  href={"https://qolkrex.foundation/"}
                  className="hover:underline sm:text-center ml-1"
                >
                  Qolkrex Foundation
                </Link>
              </span>
            </div>
          </div>
        </div>
      </footer>
      <ButtonTop />
    </div>
  );
};
