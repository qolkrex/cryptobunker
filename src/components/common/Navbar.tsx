"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavLink from "./links/NavLinks";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const Navbar = () => {
  const [open, setOpen] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  const { data: session, status } = useSession();

  const isAdmin = false;

  const links = [
    {
      name: "",
      path: "/",
    },
    // {
    //     name: 'Acerca de',
    //     path: '/#about'
    // }
  ];

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="top-0 sticky z-50 w-full h-0">
      <div
        className={`w-full ${
          scrollY > 0 ? "backdrop-blur-md bg-white/15" : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 py-6">
          <Link href="/" className="flex items-center  rtl:space-x-reverse">
            {/* <Image
              src={"/img/logo.svg"}
              alt="logo"
              width={32}
              height={32}
              className="object-contain h-8 w-40"
              onError={(e) => {
                e.currentTarget.src =
                  "https://res.cloudinary.com/giandiaz/image/upload/v1710799117/c8fun2tj1hphk2sx0uuc.png";
              }}
            /> */}
            <h1 className="text-white text-3xl">CryptoBunker</h1>
            {/* <Image
              src={"/img/logo.webp"}
              alt="logo"
              width={100}
              height={100}
              className="object-contain h-8 w-44"
            /> */}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
              {links.map((link, i) => (
                <li key={i}>
                  <NavLink href={link.path} aria-current="page">
                    {link.name}
                  </NavLink>
                </li>
              ))}

              {session?.user?.name ? (
                <>
                  {isAdmin ? (
                    <li>
                      <NavLink href="/dashboard">Admin</NavLink>
                    </li>
                  ) : (
                    <li>
                      <NavLink href="/dashboard">Dashboard</NavLink>
                    </li>
                  )}
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="flex items-center justify-center bg-primary py-4 px-10 rounded-md w-[179px] text-white"
                  >
                    Únete
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {
            <div
              className={`w-full md:hidden md:w-auto transition-transform  ${
                open ? "-translate-y-[500px] h-0" : "translate-y-0 h-auto"
              }`}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
                {links.map((link, i) => (
                  <li key={i}>
                    <NavLink href={link.path} aria-current="page">
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                {session?.user?.name ? (
                  <>
                    {isAdmin ? (
                      <li>
                        <NavLink href="/dashboard">Admin</NavLink>
                      </li>
                    ) : (
                      <li>
                        <NavLink href="/dashboard">Dashboard</NavLink>
                      </li>
                    )}
                  </>
                ) : (
                  <li>
                    <Link
                      href="/login"
                      className="block py-2 px-3 text-white  rounded bg-opacity-20 md:p-0 md:bg-transparent hover:bg-yellow-500 transition-colors "
                    >
                      Únete
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          }
        </div>
      </div>
    </nav>
  );
};
