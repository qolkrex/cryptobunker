"use client";
import { ICrypto } from "@/app/dashboard/page";
import { useWallet } from "@/hooks/useWalletContext";
import { FC, useState } from "react";
import { CryptoTable } from "./tables/crypto/CryptoTable";

interface Props {
  cryptos?: ICrypto[];
}

export const AdminContent: FC<Props> = ({ cryptos }) => {
  const [totalValueWallet, setTotalValueWallet] = useState(0.0);
  const { showBalance, setShowBalance } = useWallet();

  return (
    <div className="px-5 md:px-12 md:pb-14">
      <div className="flex flex-col max-w-44">
        <span className="text-sm">Valor de la billetera</span>
        <div className="flex">
          {showBalance ? (
            <span className="text-2xl font-bold">
              ${totalValueWallet.toFixed(2)}
            </span>
          ) : (
            <span className="text-2xl font-bold">$ ******</span>
          )}
          <button
            className="ml-auto"
            onClick={() => {
              setShowBalance(!showBalance);
            }}
          >
            <i className="pi pi-eye text-xl"></i>
          </button>
          {/* <i className="pi pi-eye-slash"></i> */}
        </div>
      </div>
      {/* Add your content here */}

      <div className="mt-10"></div>
      <CryptoTable
        cryptos={cryptos}
        setTotalValueWallet={setTotalValueWallet}
      />
      <div className="flex flex-col pt-7 pb-5 px-10 mb-8 mt-14 mx-auto w-11/12 md:max-w-[880px] bg-[#F7A813] rounded-3xl text-black relative">
        <img
          src="/img/icons/notificate.svg"
          className="w-[50px] absolute left-[25px] -top-[25px]"
          alt=""
        />
        <ul className="">
          Los precios de los activos digitales pueden ser volátiles. Por favor,
          ten en cuenta los riesgos asociados antes de realizar cualquier
          transacción.
        </ul>
      </div>
    </div>
  );
};
