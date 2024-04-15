"use client";
import { FC, useEffect, useState } from "react";
// import * as userApi from '@/server';
import { ICrypto } from "@/app/dashboard/page";
import { useWallet } from "@/hooks/useWalletContext";
import { deleteUser, updateUser } from "@/server";
import {
  getETHBalance,
  getGMKBalanceFromAddress,
  getGMKPriceInUSD,
  getUsdtBalance as getUSDTFROMADDRESS,
} from "@/utils/contract/contractInteraction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CryptoTableItem } from "./CryptoTableItem";
import { Dialog } from "primereact/dialog";

interface CryptoTableProps {
  cryptos?: ICrypto[];
  setTotalValueWallet: React.Dispatch<React.SetStateAction<number>>;
}

export const CryptoTable: FC<CryptoTableProps> = ({
  cryptos: users,
  setTotalValueWallet,
}) => {
  const [userInfo, setuserInfo] = useState(users);
  const { setTotalValueInUSD } = useWallet();
  const [gmkCurrentPrice, setGmkCurrentPrice] = useState(0);
  const { data: userSession } = useSession();
  const [addTokenModal, setAddTokenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTotalValueWallet(
      userInfo
        ?.map((u) => Number(u?.balanceInUsd?.replace("$", "") ?? 0))
        .reduce((acc, cur) => (isNaN(cur) ? acc : acc + cur), 0) || 0
    );
    setTotalValueInUSD(
      userInfo
        ?.map((u) => Number(u?.balanceInUsd?.replace("$", "") ?? 0))
        .reduce((acc, cur) => (isNaN(cur) ? acc : acc + cur), 0) || 0
    );
  }, [userInfo, gmkCurrentPrice]);

  useEffect(() => {
    getGMKPriceInUSD()
      .then((res) => {
        setGmkCurrentPrice(Number(res));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setTotalValueWallet]);
  useEffect(() => {
    getGMKBalanceFromAddress(userSession?.user?.address || "0x0")
      .then((res) => {
        const balance = Math.floor(Number(res) * 100) / 100;
        setuserInfo((oldState: any) => {
          // Usar map para crear un nuevo array con las actualizaciones
          const newState = oldState?.map((u: any) => {
            // Comprobar si el ID es 1 y actualizar la propiedad balance
            if (u?.id === 1) {
              return {
                ...u, // Mantener las propiedades existentes
                balance: `${balance.toFixed(2)}`, // Actualizar la propiedad balance
                balanceInUsd: `$${(balance * 0.01).toFixed(2)}`,
                price: `$${gmkCurrentPrice.toFixed(2)}`,
              };
            }
            // Si no es el ID 1, devolver el objeto sin cambios
            return u;
          });
          return newState; // Devolver el nuevo estado actualizado
        });
      })
      .catch((err) => {
        console.log(err);
      });
    getUSDTFROMADDRESS(userSession?.user?.address || "0x0")
      .then((res) => {
        setuserInfo((oldState: any) => {
          // Usar map para crear un nuevo array con las actualizaciones
          const newState = oldState?.map((u: any) => {
            // Comprobar si el ID es 1 y actualizar la propiedad balance
            if (u?.id === 3) {
              return {
                ...u,
                balance: `${res.toFixed(2)}`, // Actualizar la propiedad balance
                balanceInUsd: `$${res.toFixed(2)}`,
                price: `$${(1).toFixed(2)}`,
              };
            }
            // Si no es el ID 1, devolver el objeto sin cambios
            return u;
          });
          return newState; // Devolver el nuevo estado actualizado
        });
      })
      .catch((err) => {
        console.log(err);
      });
    //TODO: Poner balor de ETH a USDT
    getETHBalance(userSession?.user?.address || "0x0")
      .then((res: any) => {
        setuserInfo((oldState: any) => {
          // Usar map para crear un nuevo array con las actualizaciones
          const newState = oldState?.map((u: any) => {
            // Comprobar si el ID es 1 y actualizar la propiedad balance
            if (u?.id === 4) {
              return {
                ...u,
                balance: `${res.toFixed(2)}`, // Actualizar la propiedad balance
                balanceInUsd: `$${res.toFixed(2)}`,
                price: `$${(1).toFixed(2)}`,
              };
            }
            // Si no es el ID 1, devolver el objeto sin cambios
            return u;
          });
          return newState; // Devolver el nuevo estado actualizado
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userSession, gmkCurrentPrice]);

  return (
    <div className="relative overflow-x-auto max-w-5xl lg:max-w-6xl bg-[#414141] md:px-10 py-2 rounded-2xl">
      <div className="bg-[#414141] py-4 px-6 rounded-t-xl hidden md:flex justify-end">
        <div className="border rounded-full w-auto flex">
          <button
            className="flex justify-center items-center gap-2 focus:bg-primary focus:text-white py-3 px-4 w-auto rounded-full"
            onClick={() => setAddTokenModal(true)}
          >
            <i className="pi pi-plus-circle"></i>
            Agregar Token
          </button>
        </div>
        <Dialog
          header="Agregar Token"
          visible={addTokenModal}
          style={{ width: "50vw" }}
          onHide={() => setAddTokenModal(false)}
          headerClassName="bg-[#414141] text-white"
          contentClassName="bg-[#414141] text-white"
          resizable={false}
          draggable={false}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="tokenContract">Contrato del Token</label>
              <input
                type="text"
                id="tokenContract"
                className="bg-[#414141] border border-gray-500 rounded-lg p-2"
              />
            </div>

            {/* divisor */}
            <div className="border-b border-gray-500"></div>

            <div className="flex flex-col gap-2">
              <label htmlFor="tokenName">Nombre del Token</label>
              <input
                type="text"
                id="tokenName"
                className="bg-[#414141] border border-gray-500 rounded-lg p-2"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="tokenSymbol">Símbolo del Token</label>
              <input
                type="text"
                id="tokenSymbol"
                className="bg-[#414141] border border-gray-500 rounded-lg p-2"
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="tokenDecimals">Decimales del Token</label>
              <input
                type="number"
                id="tokenDecimals"
                className="bg-[#414141] border border-gray-500 rounded-lg p-2"
                readOnly
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                className="bg-danger text-white rounded-lg py-2 px-4"
                onClick={() => setAddTokenModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-primary text-white rounded-lg py-2 px-4"
                onClick={() => setAddTokenModal(false)}
              >
                Guardar
              </button>
            </div>
          </div>
        </Dialog>
        {/* <div className="border rounded-full w-auto flex">
          <button className="flex justify-center items-center gap-2 focus:bg-yellow-400 focus:text-black py-3 px-2 w-32 rounded-full">
            Token
          </button>

          <button
            className="flex justify-center items-center gap-2 focus:bg-yellow-400 focus:text-black py-3 px-2 w-32 rounded-full"
            onClick={() => router.push("/dashboard/swap/nfts")}
          >
            NFTs
          </button>
          <button
            className="flex justify-center items-center gap-2 focus:bg-yellow-400 focus:text-black py-3 px-2 w-32 rounded-full"
            onClick={() => router.push("/dashboard/swap/stake")}
          >
            Stacking
          </button>

          <button
            className="flex justify-center items-center gap-2 focus:bg-yellow-400 focus:text-black py-3 px-2 w-32 rounded-full"
            onClick={() => {
              router.push("/dashboard/history");
            }}
          >
            Transacciones
          </button>
        </div> */}
      </div>
      <ul className="bg-[#414141] hidden">
        <li className="px-6 py-3 text-sm">
          <button className="flex items-center gap-2 border border-transparent focus:border-white py-2 px-3 rounded-2xl">
            <div className="size-3 bg-red-600 rounded-full"></div>
            All accounts
            <i className="pi pi-chevron-down"></i>
          </button>
        </li>
        <li className="px-6 py-3 text-sm">
          <button className="flex items-center gap-2 border border-transparent focus:border-white py-2 px-3 rounded-2xl">
            <div className="size-3 bg-blue-600 rounded-full"></div>3 Networks
            <i className="pi pi-chevron-down"></i>
          </button>
        </li>
        <li className="px-6 py-3">
          <button className="flex items-center gap-2 border border-transparent focus:border-white py-2 px-3 rounded-2xl">
            Token view
            <i className="pi pi-chevron-down"></i>
          </button>
        </li>
        <li className="px-6 py-3">
          <button className="flex items-center gap-2 border border-transparent focus:border-white py-2 px-3 rounded-2xl">
            More
            <i className="pi pi-chevron-down"></i>
          </button>
        </li>
      </ul>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-b-xl ">
        <thead className="text-xs text-gray-600 uppercase bg-[#414141] dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Token
            </th>
            <th scope="col" colSpan={3} className="px-6 py-3 hidden xs:flex">
              Precio
            </th>
            <th scope="col" className="px-6 py-3">
              Balance
            </th>
            <th scope="col" className="px-6 py-3 hidden sm:flex">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {userInfo?.map((user) => {
            return (
              <CryptoTableItem
                key={user?.id}
                crypto={user}
                onToggleStatus={updateUser}
                deleteUser={deleteUser}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
