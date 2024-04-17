"use client";
import ButtonBase from "@/components/common/buttons/ButtonBase";
import { TOKENS } from "@/config";
import {
  getGMKBalanceFromAddress,
  getUsdtBalance,
} from "@/utils/contract/contractInteraction";
import {
  getPrivateKey,
  transferForAddress,
} from "@/utils/contract/contractWithoutWalletInteraction";
import { useSession } from "next-auth/react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { TypeOptions, toast } from "react-toastify";
import Swal from "sweetalert2";
import { transferUSDTToAddress } from "../../rounds/Web3Client";
import { Tooltip } from "primereact/tooltip";

export default function PageSendAndRecive() {
  const [show, setShow] = useState(true);
  const [amountToSend, setamountToSend] = useState(0);
  const [sendTo, setSendTo] = useState("");
  const [gmkBalanceOf, setgmkBalanceOf] = useState(0);
  // const [bnbBalance, setBnbBalance] = useState(0);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [activeCoin, setActiveCoin] = useState("USDT");
  const [showSelect, setShowSelect] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [passwordSecret, setPasswordSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: userSession } = useSession();

  const [coins, setCoins] = useState({
    USDT: {
      balance: 0,
      symbol: "USDT",
      image: "/img/crypto/TETHER.png",
      address: TOKENS.USDT.address,
    },
    GMK: {
      balance: 0,
      symbol: "DGSOL",
      image: "/img/crypto/dgsol-token-2-white.webp",
      address: TOKENS.GMK.address,
    },
  });
  // console.log(address);
  const { data } = useSession();
  const message = (
    type: TypeOptions,
    message: string,
    autoClose: number | false
  ) => {
    toast(message, {
      type,
      autoClose,
      position: "bottom-right",
    });
  };

  const commission = amountToSend * 0.000009;
  const totalToPay: number = amountToSend + commission;

  console.log("totalToPay", totalToPay);
  console.log("commission", commission);

  // TODO: No enviar NFT a esta direccion
  /*
    - No enviar monedas que no se encuentren en la billetera
    - Deposito minimo: 5 USDT, 0.01 ETH, 10 OPT.
    - Al aprovar usuario kyc enviar APROVE del contrato 

  */

  const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (data?.user?.isMetamask) {
        if (amountToSend === 0) {
          setLoading(false);
          return message("error", "La cantidad a enviar no puede ser 0", 3500);
        }
        if (sendTo === "") {
          setLoading(false);
          return message(
            "error",
            "La dirección a enviar no puede estar vacia",
            3500
          );
        }
        if (amountToSend > coins[activeCoin as keyof typeof coins]?.balance) {
          setLoading(false);
          return message(
            "error",
            "Saldo insuficiente para realizar esta transacción",
            3500
          );
        }
        try {
          await transferUSDTToAddress(
            sendTo,
            data?.user?.address || "",
            amountToSend,
            coins[activeCoin as keyof typeof coins]?.address
          );
          getBalanceInSendAndReceive();
          setLoading(false);
          Swal.fire({
            title: "Success",
            text: "Transaction completed",
            icon: "success",
            confirmButtonText: "Ok",
          });
        } catch (error: any) {
          console.log(error);
          if (error?.reason === "user rejected transaction")
            return message("error", "Transacción rechazada", 3500);
          setLoading(false);
        }
      } else {
        if (amountToSend === 0) {
          setLoading(false);
          return message("error", "La cantidad a enviar no puede ser 0", 3500);
        }
        if (sendTo === "") {
          setLoading(false);
          return message(
            "error",
            "La dirección a enviar no puede estar vacia",
            3500
          );
        }
        if (amountToSend > coins[activeCoin as keyof typeof coins]?.balance) {
          setLoading(false);
          return message(
            "error",
            "Saldo insuficiente para realizar esta transacción",
            3500
          );
        }
        if (passwordSecret === "") {
          setLoading(false);
          return message("error", "La contraseña no puede estar vacia", 3500);
        }
        setShowDialog(true);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Transaction failed",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  const getBalanceInSendAndReceive = () => {
    getUsdtBalance(data?.user?.address || "").then((res) => {
      console.log(res);
      setUsdtBalance(Number(res));
      setCoins((oldState) => {
        return {
          ...oldState,
          USDT: {
            ...oldState.USDT,
            balance: Number(res),
          },
        };
      });
    });
    getGMKBalanceFromAddress(data?.user?.address || "").then((res) => {
      console.log(res);
      setgmkBalanceOf(Number(res));
      setCoins((oldState) => {
        return {
          ...oldState,
          GMK: {
            ...oldState.GMK,
            balance: Number(res),
          },
        };
      });
    });
  };

  useEffect(() => {
    getBalanceInSendAndReceive();
  }, [data]);

  // use effect to click outside the select and close it
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".absolute") && !target.closest("label")) {
        setShowSelect(false);
      }
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [showSelect]);

  return (
    <div className="px-12 py-14 flex justify-center">
      <form
        className="flex flex-col border bg-[#414141] px-16 py-8 border-none rounded-lg shadow-xl w-full max-w-xl"
        onSubmit={handleSend}
      >
        <div className="flex pb-4">
          <button
            onClick={() => setShow(true)}
            type="button"
            className={`py-3 px-4 hover:bg-gray-500 ${
              show ? "border-b-2 border-primary text-primary" : ""
            }`}
          >
            Enviar
          </button>
          <button
            onClick={() => setShow(false)}
            type="button"
            className={`py-3 px-4 hover:bg-gray-500 ${
              !show ? "border-b-2 border-primary text-primary" : ""
            }`}
          >
            Recibir
          </button>
        </div>
        {show ? (
          <>
            <div className="flex flex-col">
              {/* <label htmlFor="" className="flex flex-col">
                Send from
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 mb-2 text-black"
                  placeholder="0x00423435346364364"
                />
              </label> */}
              <label htmlFor="" className="flex flex-col">
                Enviar a
                <input
                  type="text"
                  className="border border-gray-300 rounded-md mt-2 px-4 py-3 mb-2 text-white bg-[#333333]"
                  placeholder="0x78423435346364364"
                  onChange={(e) => setSendTo(e.target.value)}
                  value={sendTo}
                />
              </label>
              <div className="relative">
                <label
                  htmlFor=""
                  className="flex  justify-between my-2 "
                  onClick={(e) => {
                    console.log("click");
                    setShowSelect(!showSelect);
                  }}
                >
                  <div className="flex items-center py-1 gap-3 ">
                    <img
                      src={coins[activeCoin as keyof typeof coins]?.image}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span>
                        {coins[activeCoin as keyof typeof coins]?.symbol ||
                          "USDT"}{" "}
                      </span>
                      <span>
                        {coins[activeCoin as keyof typeof coins]?.symbol ===
                        "USDT"
                          ? "Tether"
                          : "DGSOL"}{" "}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-auto items-start justify-end py-1">
                    <div className="flex h-full flex-col text-right justify-between">
                      <span>Balance</span>
                      <span>
                        {coins[
                          activeCoin as keyof typeof coins
                        ]?.balance.toFixed(4)}{" "}
                        USDT
                      </span>
                    </div>
                  </div>
                </label>
                {/* Div like select when click other div show options */}
                <div
                  className={`absolute top-16 w-full bg-[#414141] rounded-br-lg rounded-bl-lg overflow-hidden shadow-lg  border-b border-l border-r border-white transition-transform z-10 ${
                    showSelect
                      ? "scale-100 translate-y-0"
                      : "scale-0 -translate-y-14"
                  }`}
                >
                  <div
                    className="flex flex-col border-b border-b-white"
                    onClick={() => {
                      setActiveCoin("USDT");
                      setShowSelect(false);
                    }}
                  >
                    <div className="flex justify-between items-center px-4 w-full hover:bg-gray-500 py-5 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <img
                          src="/img/crypto/TETHER.png"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <span>USDT</span>
                      </div>
                      <span>{usdtBalance.toFixed(4)} USDT</span>
                    </div>
                  </div>
                  <div
                    className="flex flex-col "
                    onClick={() => {
                      setActiveCoin("GMK");
                      setShowSelect(false);
                    }}
                  >
                    <div className="flex justify-between items-center px-4 w-full hover:bg-gray-500 py-5 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <img
                          src="/img/crypto/dgsol-token-2-white.webp"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <span>DGSOL</span>
                      </div>
                      <span>{gmkBalanceOf.toFixed(4)} DGSOL</span>
                    </div>
                  </div>
                </div>
              </div>
              <label htmlFor="" className="flex flex-col relative">
                Cantidad
                <input
                  type="number"
                  className="border border-gray-300 rounded-md mt-1 px-4 py-3 mb-2 bg-[#333333] text-white"
                  placeholder="0"
                  step={"any"}
                  onChange={(e) => {
                    const inputValue = e.target.value.trim();
                    // Check if the input is a valid number or empty
                    const isValidNumber = /^\d+(\.\d*)?$/.test(inputValue);
                    const numericValue: any = isValidNumber
                      ? inputValue
                      : inputValue;
                    setamountToSend(numericValue.toString());
                  }}
                  value={amountToSend !== 0 ? amountToSend.toString() : ""}
                />
                <span
                  className="text-primary text-sm absolute right-0 top-0 cursor-pointer"
                  onClick={() =>
                    setamountToSend(
                      Number(
                        coins[
                          activeCoin as keyof typeof coins
                        ]?.balance.toFixed(4)
                      )
                    )
                  }
                >
                  Max
                </span>
              </label>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <p>Enviar</p>
                <p>
                  {amountToSend} {activeCoin}
                </p>
              </div>
              {/* COMISION TAX 0.0009% (FCS) */}
              <div className="flex items-center justify-between gap-2">
                <Tooltip target="#fcs-text" position="top" className="max-w-[400px]">
                  <p className="text-sm">
                    Es un pequeño porcentaje aplicado a cada transacción en la
                    plataforma CryptoBunker. <br/> Este fee se destina al staking,
                    donde los usuarios pueden bloquear sus activos para ayudar a
                    asegurar la red y ganar recompensas.
                  </p>
                </Tooltip>
                <p id="fcs-text">
                  Comisión -{" "}
                  <span className="font-bold text-sm">0.0009% (FCS) (?)</span>
                </p>
                <p>
                  {commission.toFixed(3) || 0} {activeCoin}
                </p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <p>Total a pagar</p>
                <p>
                  {(Number(amountToSend) + Number(commission)).toFixed(4)}{" "}
                  {activeCoin}
                </p>
              </div>
            </div>
            <Button
              type="button"
              loading={loading}
              className="w-full mt-4 py-2 px-10 bg-primary hover:bg-primaryHover hover:ring-primary p-2 text-white text-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => setShowDialog(true)}
            >
              <p className="mx-auto text-lg font-bold">Enviar</p>
            </Button>
          </>
        ) : (
          <div className=" flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="" className="flex flex-col">
                Address
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-3 mb-2  mt-2 text-white bg-[#333333]"
                  placeholder="0x00423435346364364"
                  value={data?.user?.address || ""}
                />
              </label>
            </div>
            <img
              src="/img/admin/swap/qr.png"
              alt="qr"
              className="w-40 h-40 mx-auto"
            />

            <button
              type="button"
              className="flex justify-center gap-3 w-full mt-4 bg-transparent border border-gray-300 rounded-md px-4 py-2 mb-2"
              onClick={() => {
                navigator.clipboard.writeText(data?.user?.address || "");
                message("info", "Se copio la dirección correctamente", 1000);
              }}
            >
              <i className="pi pi-copy"></i>
              Copiar dirección
            </button>
          </div>
        )}
      </form>
      <Dialog
        onHide={() => {
          setShowDialog(false);
          setLoading(false);
          setPasswordSecret("");
        }}
        visible={showDialog}
        style={{ width: "450px" }}
        headerClassName="text-white bg-[#414141] border-none"
        contentClassName="bg-[#414141] border-none text-white"
        header="Confirmar Transacción"
        resizable={false}
        draggable={false}
        closable={false}
      >
        <div className="flex flex-col gap-5">
          <p className="text-xl">
            ¿Estás seguro de que deseas realizar esta transacción?
          </p>
          <div className="bg-[#333333] p-4 rounded-xl">
            <div className="flex items-start justify-between gap-2">
              <p>Eviar a</p>
              <p>
                {sendTo.slice(0, 6)}...{sendTo.slice(sendTo.length - 4)}
              </p>
            </div>
            <div className="flex items-start justify-between gap-2">
              <p>Recibir</p>
              <p>
                {amountToSend} {activeCoin}
              </p>
            </div>
          </div>
          <div>
            {/* Input Confirm transaction with password with label tailwindcss */}
            <label htmlFor="" className="flex flex-col">
              Contraseña de transacción
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full h-12 p-4 rounded-xl bg-[#333333] border border-[#414141] text-white focus:outline-none "
              value={passwordSecret}
              onChange={(e) => setPasswordSecret(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <Button
              label="Cancelar"
              className="p-button-outlined bg-red-500 text-white px-5 py-2"
              onClick={() => {
                setShowDialog(false);
                setLoading(false);
                Swal.fire({
                  title: "Transacción Cancelada",
                  text: "La transacción ha sido cancelada",
                  icon: "error",
                  confirmButtonText: "Ok",
                });
                setPasswordSecret("");
              }}
            />
            <Button
              label="Confirmar"
              className="p-button-outlined bg-primary text-white px-5 py-2"
              onClick={async () => {
                try {
                  const privateKey = await getPrivateKey(
                    passwordSecret,
                    userSession?.user?.address as string
                  );
                  const res = await transferForAddress(
                    sendTo,
                    amountToSend,
                    privateKey,
                    data?.user?.address || "",
                    coins[activeCoin as keyof typeof coins]?.address
                  );
                  setShowDialog(false);
                  setLoading(false);
                  getBalanceInSendAndReceive();
                  setPasswordSecret("");
                  Swal.fire({
                    title: "Transacción Exitosa",
                    text: "La transacción ha sido exitosa",
                    icon: "success",
                    confirmButtonText: "Ok",
                  });
                } catch (error) {
                  console.log(error);
                  setPasswordSecret("");
                  message("error", "Contraseña incorrecta", 3500);
                }
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
