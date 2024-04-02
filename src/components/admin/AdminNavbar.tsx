"use client";
import { UIContext } from "@/context";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ButtonNavbarConnect } from "../common/ButtonNavbarConnect";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { useWallet } from "@/hooks/useWalletContext";

export const AdminNavbar = () => {
  // auth
  const { data: session, status } = useSession();
  const { height, width } = useWindowDimensions();
  const { totalValueInUSD, showBalance } = useWallet();

  const { sideBarOpen, toggleSideBar } = useContext(UIContext);
  const router = useRouter();

  // menu left
  const menuLeft = useRef<any>(null);
  const toast = useRef<any>(null);

  const [openModalConnect, setOpenModalConnect] = useState(true);

  const items: MenuItem[] = [
    {
      label: "Opciones",
      items: [
        {
          label: "Mi Perfil",
          icon: "pi pi-fw pi-user",
          command: () => {
            router.push("/dashboard/profile");
          },
        },
        {
          label: "Configuración",
          icon: "pi pi-fw pi-cog",
          command: () => {
            router.push("/dashboard/settings");
          },
        },
      ],
    },
    {
      label: "Navigate",
      items: [
        // {
        //   label: "React Website",
        //   icon: "pi pi-external-link",
        //   url: "https://reactjs.org/",
        // },
        {
          label: "Salir",
          icon: "pi pi-sign-out",
          command: () => {
            signOut();
          },
        },
      ],
    },
  ];
  // if (!session) return (
  //     redirect('/login')
  // )

  return (
    <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-800 from-24% via-neutral-900 via-60% to-neutral-950 to-100% py-5 sticky top-0 w-full z-40">
      <div className="max-w-[1980px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center flex-shrink-0">
              <Button
                className="text-white px-5 py-3 bg-yellow-600 hover:bg-yellow-800 mr-10"
                onClick={() =>
                  session?.user?.verified === "approved" &&
                  toggleSideBar(!sideBarOpen)
                }
              >
                {sideBarOpen || session?.user?.verified === "approved" ? (
                  <svg
                    className="size-5 text-white"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 11.9299H2"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.00009 19L2.84009 14C2.5677 13.7429 2.35071 13.433 2.20239 13.0891C2.05407 12.7452 1.97754 12.3745 1.97754 12C1.97754 11.6255 2.05407 11.2548 2.20239 10.9109C2.35071 10.567 2.5677 10.2571 2.84009 10L8.00009 5"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
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
                    <path d="M4 6l16 0" />
                    <path d="M4 12l16 0" />
                    <path d="M4 18l16 0" />
                  </svg>
                )}
              </Button>

              <Link href="/">
                <Image
                  src="/img/logo.png"
                  alt="1"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover z-10 hidden md:block"
                />
              </Link>
            </div>
          </div>
          <div className="flex">
            {/* notification button */}
            <button className="md:flex items-center mr-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white my-auto h-10 w-10 rounded-full hidden">
              <i className="text-white text-2xl mx-auto pi pi-fw pi-bell"></i>
            </button>

            {/* founds */}
            {/* <div className="md:flex items-center mr-4 hidden">
              <div className="flex flex-col text-white">
                <span className="text-white text-sm">Fondos</span>
                {showBalance ? (
                  <span className="text-2xl font-bold">
                    ${totalValueInUSD.toFixed(2)}
                  </span>
                ) : (
                  <span className="text-2xl font-bold">$ ******</span>
                )}
              </div>
            </div> */}
            <div className="ml-4 hidden md:flex items-center md:ml-5 md:mr-3">
              <Toast ref={toast}></Toast>
              <Menu
                model={items}
                popup
                ref={menuLeft}
                id="popup_menu_left"
                className="mt-2"
              />
              <Button
                className="mr-2 rounded-full"
                onClick={(event) => menuLeft.current.toggle(event)}
                aria-controls="popup_menu_left"
                aria-haspopup
              >
                {session?.user?.image ? (
                  <img
                    className="h-10 w-10"
                    src={session.user.image}
                    alt="Logo"
                  />
                ) : (
                  <i
                    className="pi pi-user text-4xl p-2"
                    style={{ color: "#fff" }}
                  ></i>
                )}
              </Button>
            </div>
            {/* {session?.user?.isMetamask || session?.user?.address && ( */}
            <ButtonNavbarConnect
              openModal={openModalConnect}
              setOpenModal={setOpenModalConnect}
            />
            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};
