"use client";

import { UIContext } from "@/context";
import { getOwner } from "@/utils/contract/contractInteraction";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useContext, useEffect, useState } from "react";
import { LogoutButton } from "../auth/buttons/LogoutButton";
import AdminLink from "./links/AdminLinks";

interface Items {
  title?: string;
  label?: string;
  icon?: string;
  href?: string;
  role: string[];
  children?: Items[];
  IconComponent?: React.ReactNode;
  owner?: boolean;
}

interface PropsListItems {
  items?: Items[];
}

interface PropsListItem {
  item?: Items;
}

export const AdminSidebar = () => {
  const { sideBarOpen, toggleSideBar } = useContext(UIContext);
  const { data: session } = useSession();

  const items: Items[] = [
    {
      label: "Billetera",
      icon: "pi pi-home",
      href: "/dashboard",
      role: ["admin", "user"],
    },
    {
      title: "Administrar",
      role: ["admin", "validator"],
      icon: "pi pi-cog",
      // label: "Administrar",
      // icon: "pi pi-cog",
      // href: "/dashboard/user",
      // role: ['admin'],
      children: [
        {
          label: "Gestionar Roles",
          icon: "pi pi-user-plus",
          href: "/dashboard/roles-user",
          role: ["admin"],
          owner: true,
        },
        {
          label: "Rondas",
          icon: "pi pi-calendar",
          href: "/dashboard/rounds",
          role: ["admin"],
          owner: true,
        },
        {
          label: "Mintear",
          icon: "pi pi-plus",
          href: "/dashboard/mint",
          role: ["admin"],
          owner: true,
        },
        {
          label: "KYC",
          icon: "pi pi-check",
          href: "/dashboard/verify-users",
          role: ["admin", "validator"],
        },
        // {
        //   label: "Users",
        //   icon: "pi pi-user",
        //   href: "/dashboard/user",
        //   role: ["admin"],
        // },
        {
          label: "Transacciones",
          icon: "pi pi-money-bill",
          href: "/dashboard/transaction",
          role: ["admin"],
        },
        {
          label: "Estadísticas",
          icon: "pi pi-chart-bar",
          href: "/dashboard/statistics",
          role: ["admin"],
        },
        // {
        //   label: "Historial",
        //   icon: "pi pi-history",
        //   href: "/dashboard/history",
        //   role: ["admin"],
        // },
      ],
    },
    {
      label: "Intercambio",
      icon: "pi pi-sync",
      href: "/dashboard/swap",
      role: ["user", "admin", "userWhitelist", "validator"],
    },
    {
      label: "Enviar y Recibir",
      icon: "pi pi-send",
      href: "/dashboard/swap/send-and-recive",
      role: ["admin", "userWhitelist", "validator"],
    },
    {
      label: "Stake",
      icon: "pi pi-chart-bar",
      href: "/dashboard/swap/stake",
      role: ["user", "admin", "userWhitelist", "validator"],
    },
    {
      label: "Nfts",
      // icon: "pi pi-sync",
      IconComponent: (
        <Image
          src="/img/icons/nft-icon.png"
          alt="1"
          width={20}
          height={20}
          className="w-5 h-5 object-contain z-10"
        />
      ),
      href: "/dashboard/swap/nfts",
      role: ["user", "admin", "userWhitelist", "validator"],
    },
    {
      label: "Historial",
      icon: "pi pi-history",
      href: "/dashboard/history",
      role: ["admin", "validator", "userWhitelist"],
    },
    // {
    //   title: "Wallet",
    //   role: ["user", "admin", "userWhitelist", "validator"],
    //   icon: "pi pi-wallet",
    //   children: [
        
    //   ],
    // },
    // {
    //     label: "Wallet",
    //     icon: "pi pi-wallet",
    //     href: "/dashboard/tokens",
    //     role: ['admin', 'user']
    // },
    
    // {
    //     label: "Salir",
    //     icon: "pi pi-sign-out",
    //     href: "/dashboard/login"
    // }
  ];

  useEffect(() => {
    const handleResize = () => {
      toggleSideBar(window.innerWidth >= 1024); // 768px is md breakpoint in Tailwind CSS
    };

    handleResize(); // Set initial state based on window width

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div
        className={`lg:sticky fixed  top-[103px] h-full ${
          sideBarOpen ? "translate-x-0 w-auto min-w-64" : "-translate-x-full"
        } transition-all min-h-[90vh] z-30`}
      >
        <div
          className={`overflow-hidden flex flex-col bg-white max-w-64 min-h-[80vh] h-[90vh] py-10 pt-3 overflow-y-auto w-full ${
            sideBarOpen
              ? "translate-x-0 w-auto px-5 pr-5 min-w-32"
              : "-translate-x-full w-0 px-0 pr-0"
          } transition-all duration-300 ease-in-out top-0 z-50 shadow-md fixed`}
        >
          {/* <Sidebar visible={visible} onHide={() => setVisible(false)}> */}
          <div className="w-full flex text-2xl font-bold tracking-wide font-monserrat">
            <Link href="/dashboard" className="flex flex-col items-center mb-5 gap-2">
              {/* CryptoBunker */}

              <Image
                src="/img/cb-logo.webp"
                alt="1"
                width={100}
                height={100}
                className="w-full h-full object-cover z-10 max-w-[70px]"
              />
              <Image
                src="/img/cryptobunker.webp"
                alt="1"
                width={350}
                height={150}
                className="w-full h-full object-cover z-10"
              />
            </Link>
          </div>
          <div className="flex flex-col py-2 my-2 h-full ">
            {sideBarOpen && (
              <>
                <SidebarList items={items} />

                <div className="flex flex-1 h-full"></div>

                {session?.user && <LogoutButton />}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const SidebarList: FC<PropsListItems> = ({ items }) => {
  const { data: session } = useSession();
  const allowedItems = items?.filter((item) => {
    const allowedRoles = item.role || []; // Default to empty array if role is not specified
    return allowedRoles.some((role) => session?.user?.roles?.includes(role));
  });
  return (
    <div className="flex flex-col gap-2 ">
      {allowedItems?.map((item, index) => (
        <SidebarListItems key={index} item={item} />
      ))}
    </div>
  );
};

const SidebarListItems: FC<PropsListItem> = ({ item }) => {
  const { sideBarOpen, toggleSideBar } = useContext(UIContext);
  const { data } = useSession();
  const [ownerAddress, setOwnerAddress] = useState("");

  const [show, setshow] = useState(false);

  //   console.log({ item });

  useEffect(() => {
    getOwner().then((res) => {
      // console.log(res);
      setOwnerAddress(res);
    });
  }, []);

  if (item?.owner && data?.user?.address) {
    if (ownerAddress.toLowerCase() !== data?.user?.address.toLowerCase()) {
      return null;
    }
  }

  return (
    <>
      {item?.title ? (
        <button
          className="flex justify-between py-2 my-1 px-3 text-black  rounded  transition-colors"
          onClick={() => {
            setshow(!show);
          }}
        >
          <span className="w-full flex items-center gap-2">
            <i className={`${item?.icon} text-sm`}></i>
            {item?.label || item?.title}
          </span>
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
        </button>
      ) : (
        <AdminLink
          href={item?.href || "/"}
          // onClick={() => {
          //   toggleSideBar(true);
          // }}
        >
          <span className="w-full flex items-center gap-2">
            {item?.icon ? (
              <i className={`${item?.icon} text-sm`}></i>
            ) : (
              <>{item?.IconComponent}</>
            )}
            {item?.label || item?.title}
          </span>
        </AdminLink>
      )}
      {item?.children && (
        <div
          className="ml-4"
          style={{
            maxHeight: show ? "1000px" : "0px",
            display: show ? "block" : "none",
            transition: "max-height 0.3s ease-in-out",
          }}
        >
          {<SidebarList items={item?.children} />}
        </div>
      )}
    </>
  );
};
