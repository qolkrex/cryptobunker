"use client";
import { UIContext, UIProvider } from "@/context";
import { PrimeReactProvider } from "primereact/api";
import React, { FC, useContext } from "react";
import { AdminNavbar } from "../admin/AdminNavbar";
import { AdminSidebar } from "../admin/AdminSidebar";
import { Footer } from "../common/Footer";
import { useSession } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export const AdminProvider: FC<Props> = ({ children }) => {
  const { data } = useSession();
  return (
    <PrimeReactProvider>
      <UIProvider>
        <section className="relative min-h-[90vh]">
          {/* Include shared UI here e.g. a header or sidebar */}
          <AdminNavbar />
          <div className="h-full w-full flex flex-1">
            {data?.user?.roles?.includes("userWhitelist") && <AdminSidebar />}
            {/* <div
              className={`h-full min-h-[100vh] w-full pt-10 pl-0  from-neutral-800 from-24% via-neutral-900 via-60% to-neutral-950 to-100% text-white bg-[url(/img/bg/bg-sections.jpeg)] bg-cover bg-center `}
              // style={{
              //   backgroundSize: "1200px",
              //   backgroundRepeat: "no-repeat",
              // }}
            > */}
            <div
              className={`h-full min-h-[100vh] w-full pt-10 pl-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-800 from-24% via-neutral-900 via-60% to-neutral-950 to-100% text-white`}
            >
              {children}
            </div>
          </div>
        </section>
        <Footer />
      </UIProvider>
    </PrimeReactProvider>
  );
};
