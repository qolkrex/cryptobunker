"use client";
import {
  buyGMKWithBNB,
  buyGMKWithUSDT,
} from "@/app/dashboard/rounds/Web3Client";
import { TOKENS } from "@/config";
import { NETWORKS } from "@/config/constants/networks";
import { CoinContext } from "@/context/Coin/CoinContext";
import { coins } from "@/data/coinsData";
import { useForm } from "@/hooks/useForm";
import useNetworkChanger from "@/hooks/useNetworkChanger";
import { useSwap } from "@/hooks/useSwap";
import { useWallet } from "@/hooks/useWalletContext";
import { ISwap, ISwapValues } from "@/interfaces/ISwap";
import { getUser } from "@/server";
import { createTransaction } from "@/server/actions/history/history-action";
import { Coin } from "@/utils/balance";
import {
  getCurrentRoundInfo,
  // allowance,
  getETHBalance,
  getUsdtBalance,
} from "@/utils/contract/contractInteraction";
import {
  buyGMKWithBNBWithoutWaller,
  buyGMKWithUSDTWithoutWallet,
  getPrivateKey,
} from "@/utils/contract/contractWithoutWalletInteraction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { IRowI } from "../../../../public/interfaces/Row";
import { Row } from "./Row";

export const Board = ({ slipage, setOpen, reserves }: ISwap) => {
  const {
    coinValue,
    swapState,
    balance,
    route,
    setRoute,
    handleSwapChange,
    handleChange,
    handleSwapState,
  } = useSwap();
  const { data: userSession } = useSession();
  const [loadingSwap, setLoadingSwap] = useState(false);
  const { handleSelected, coins: coinsContext } = useContext(CoinContext);
  const {
    coins: walletCoins,
    // address,
    updateCoinBalance,
  } = useWallet();
  const [confirmModalSwap, setConfirmModalSwap] = useState(false);
  const [passwordSecret, setPasswordSecret] = useState("");
  const { changeNetwork, currentNetwork } = useNetworkChanger(
    NETWORKS.bsctestnet
  );
  const { values, setValues, reset, handleFormChange } = useForm<ISwapValues>({
    token0: "",
    token1: "",
  });
  console.log(walletCoins);
  console.log(CoinContext);
  const router = useRouter();

  const [amountToSwap, setAmountToSwap] = useState<string>("");
  const [amounToRecieve, setAmounToRecieve] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [GMKPrice, setGMKPrice] = useState(0);
  const [gmkRemaining, setgmkRemaining] = useState(0);
  const [messageBalance, setMessageBalance] = useState("");
  const [hasBalance, setHasBalance] = useState(false);

  useEffect(() => {
    const tokenId0 = coinValue.id as Coin;
    const tokenId1 = coinValue.selected as Coin;
    const tokenId2 = coins[tokenId1]?.id as Coin;
    const token0 = TOKENS[tokenId0] as any;
    const token1 = TOKENS[tokenId2] as any;
    handleSelected([token0, token1]);
  }, [coinValue]);
  const handleSwap = async () => {
    setLoadingSwap(true);

    try {
      // Realizar validaciones de entrada
      await validateInput();

      // Realizar el intercambio según la moneda seleccionada
      if (coinValue.id === "USDT") {
        await swapWithUSDT();
      } else if (coinValue.id === "BNB") {
        await swapWithBNB();
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoadingSwap(false);
    }
  };

  const validateInput = async () => {
    const bnbBalance = await getETHBalance(
      userSession?.user?.address as string
    );

    if (amountToSwap === null || Number(amountToSwap) < 0) {
      throw new Error("Please enter a valid amount to swap");
    }

    if (bnbBalance < 5000000000 / 1e18) {
      throw new Error(
        "Gas Insuficiente: No tienes suficiente gas para ejecutar esta transacción."
      );
    }

    if (amountToSwap === "" || amountToSwap === "0") {
      throw new Error(
        "Por favor, ingrese una cantidad válida para intercambiar"
      );
    }

    if (coinValue.id === "USDT") {
      const usdBalance = walletCoins.find(
        (c) => c.name === coinValue.id
      )?.balance;

      if (usdBalance && Number(amountToSwap) > usdBalance) {
        throw new Error(
          "Saldo Insuficiente: No tienes suficiente saldo para ejecutar esta transacción."
        );
      }
    }
  };

  const swapWithUSDT = async () => {
    if ((window as any).ethereum) {
      const res = await buyGMKWithUSDT(
        Number(amountToSwap) || 0,
        userSession?.user?.address as string
      );
      console.log(res);
      getBalances();
      const transaction = {
        id: res.transactionHash,
        transactionHash: res.transactionHash.toString(),
        blockHash: "",
        blockNumber: 0,
        transactionIndex: 0,
        effectiveGasPrice: 0,
        from: userSession?.user?.id as string,
        to: res.to,
        value: Number(amounToRecieve) * 1e8,
        createdAt: new Date(),
        gasUsed: 0,
        status: 1,
      };
      const r = await createTransaction(transaction);
      console.log(r);
      Swal.fire({
        title: "Success",
        text: "Transaction completed",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      setConfirmModalSwap(true);
    }
  };

  const swapWithBNB = async () => {
    const bnbBalance = await getETHBalance(
      userSession?.user?.address as string
    );

    if (bnbBalance < Number(amountToSwap)) {
      throw new Error(
        "Saldo Insuficiente: No tienes suficiente saldo para ejecutar esta transacción."
      );
    }

    if ((window as any).ethereum) {
      const res = await buyGMKWithBNB(
        Number(amountToSwap) || 0,
        userSession?.user?.address as string
      );
      console.log(res);
      getBalances();
      const transaction = {
        id: res.transactionHash.toString(),
        transactionHash: res.transactionHash.toString(),
        blockHash: res.blockHash.toString(),
        blockNumber: Number(res.blockNumber),
        transactionIndex: Number(res.transactionIndex),
        effectiveGasPrice: Number(res.effectiveGasPrice),
        from: userSession?.user?.id as string,
        to: res.to,
        value: Number(res.events.Transfer.returnValues.value),
        createdAt: new Date(),
        gasUsed: Number(res.gasUsed),
        status: Number(res.status),
      };
      const r = await createTransaction(transaction);
      console.log(r);
      Swal.fire({
        title: "Success",
        text: "Transaction completed",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      setConfirmModalSwap(true);
    }
  };

  const getBalances = async () => {
    if (coinValue.id === "USDT") {
      getUsdtBalance(userSession?.user?.address as string).then((r) => {
        if (r === 0) {
          setMessageBalance("Saldo Insuficiente");
          setHasBalance(false);
        }
        setMessageBalance("");
        setHasBalance(true);
        updateCoinBalance(3, r);
      });
    }
    if (coinValue.id === "BNB") {
      getETHBalance(userSession?.user?.address as string).then((r) => {
        if (r === 0) {
          setMessageBalance("Saldo Insuficiente");
          setHasBalance(false);
        }
        setMessageBalance("");
        setHasBalance(true);
        updateCoinBalance(4, r);
      });
    }
    if (coinValue.id === "OPTIMISM") {
      setMessageBalance("Saldo Insuficiente");
      setHasBalance(false);
    }
    if (coinValue.id === "BUSD") {
      setMessageBalance("Saldo Insuficiente");
      setHasBalance(false);
    }
  };

  // useEffect(() => {
  //   gmkBalanceOf(userSession?.user?.address as string).then((r) => {
  //     // console.log(r);
  //   });
  // }, [userSession?.user?.address as string]);

  useEffect(() => {
    setAmounToRecieve(0);
    getBalances();
    // setAmountToSwap(null);
  }, [userSession?.user?.address as string, coinValue]);

  useEffect(() => {
    (userSession?.user?.address as string) &&
      getCurrentRoundInfo()
        .then((res: any) => {
          setGMKPrice(res.priceGMKInUSDT);
          setgmkRemaining(res.maxGMKSelled - res.currentGMKSelled);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [userSession?.user?.address as string]);

  useEffect(() => {
    if (userSession?.user?.id) {
      getUser(userSession.user.id as string)
        .then((res) => {
          setUser(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [userSession]);

  return (
    <>
      <div className="flex flex-col pb-5">
        <div className="flex flex-col gap-4 justify-start items-start md:flex-row md:items-center md:justify-between mb-7">
          <span className="text-white text-2xl font-bold">Comprar</span>
          <div className="flex flex-col bg-[#333333] px-6 py-2 rounded-xl">
            <span>Precio DGSOL: {GMKPrice && GMKPrice.toFixed(2)} USD</span>
          </div>
        </div>

        <span className="text-white text-xl">from:</span>
        <Row
          key={0}
          id={0}
          values={values}
          handleFormChange={handleFormChange}
          coins={coins}
          coin={coinValue}
          coinValue={coinValue}
          balance={walletCoins.find((c) => c.name === coinValue.id)?.balance}
          handleSwapState={handleSwapState}
          handleSwapChange={handleSwapChange}
          setValues={setValues}
          setRoute={setRoute}
          reserves={reserves}
          amountToSwap={amountToSwap}
          setAmountToSwap={setAmountToSwap}
          amounToRecieve={amounToRecieve}
          setAmounToRecieve={setAmounToRecieve}
          GMKPrice={GMKPrice}
          hasBalance={hasBalance}
        />
        <div className="flex flex-col my-3">
          {/* <Change
            coinValue={coinValue}
            handleChange={handleFormChange}
            values={values}
            setValues={setValues}
            reserves={reserves}
            setRoute={setRoute}
          /> */}
        </div>
        <span className="text-white text-xl">to:</span>
        <Row
          key={1}
          id={1}
          values={values}
          handleFormChange={handleFormChange}
          coins={[coins["GMK"]] as any}
          coin={coins[coinValue.selected as keyof IRowI]}
          coinValue={coinValue}
          handleSwapChange={handleSwapChange}
          setValues={setValues}
          setRoute={setRoute}
          reserves={reserves}
          amountToSwap={amountToSwap}
          setAmountToSwap={setAmountToSwap}
          amounToRecieve={amounToRecieve}
          setAmounToRecieve={setAmounToRecieve}
          GMKPrice={GMKPrice}
          hasBalance={hasBalance}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-white text-xl">
        {user?.verified === "unverified" || user?.verified === "rejected" ? (
          <button
            onClick={() => {
              router.push("/dashboard/settings/kyc");
            }}
            className="flex flex-col pt-10 pb-5 px-10 mb-8 mt-14 mx-auto w-11/12 md:max-w-[300px] bg-primary rounded-3xl text-white relative"
          >
            <img
              src="/img/icons/notificate.svg"
              className="w-[70px] absolute left-[35px] -top-[35px]"
              alt=""
            />
            <h2 className="text-lg font-bold">
              Usuario no verificado, haz click aquí para verificar tu cuenta
            </h2>
          </button>
        ) : (userSession?.user?.address as string) ? (
          userSession?.user?.isMetamask ? (
            currentNetwork && currentNetwork === 97 ? (
              <Button
                className="py-4 px-10 rounded-xl bg-primary p-2 text-white text-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSwap}
                loading={loadingSwap}
                disabled={!hasBalance}
              >
                {!hasBalance ? <p>{messageBalance}</p> : <p>Comprar</p>}
              </Button>
            ) : (
              <button
                className="bg-primary py-4 px-10 rounded-xl"
                onClick={() => changeNetwork()}
              >
                <p>Cambiar de red</p>
              </button>
            )
          ) : (
            <Button
              className="py-4 px-10 rounded-xl bg-primary ring-1 ring-blue-700 hover:bg-primaryHover hover:ring-transparent p-2 text-white text-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSwap}
              loading={loadingSwap}
              disabled={!hasBalance}
            >
              {!hasBalance ? <p>{messageBalance}</p> : <p>Comprar</p>}
            </Button>
          )
        ) : (
          // <button
          //   onClick={handleAddress}
          //   className="bg-primary py-4 px-10 rounded-xl"
          // >
          //   Conectar Wallet
          // </button>
          <></>
        )}

        <div className="flex flex-col items-start gap-2 text-white text-xl w-full mt-6">
          <div className="flex flex-col bg-[#333333] w-full px-6 py-3 gap-6 rounded-xl">
            <div className="flex items-start justify-between gap-2 text-base">
              <p>Slippage Tolerance</p>
              <p>0.5%</p>
            </div>
            <div className="flex items-start justify-between gap-2 text-base">
              <p>Route</p>
              <p>
                {coinsContext[0]?.name === "USDT" ||
                coinsContext[1]?.name === "USDT" ? (
                  <>
                    {coinsContext[0]?.name}
                    {">"}
                    {/* {coinsContext[1]?.name} */}
                    DGSOL
                  </>
                ) : (
                  <>
                    {coinsContext[0]?.name}
                    {">"}
                    {"USDT"}
                    {">"}
                    {/* {coinsContext[1]?.name} */}
                    DGSOL
                  </>
                )}
              </p>
            </div>
          </div>
          {/* <Link
            href="/terms-and-service"
            className="text-primary text-base mx-auto cursor-pointer hover:underline mt-5"
          >
            Terminos del Servicio
          </Link> */}
        </div>
        <Dialog
          onHide={() => setConfirmModalSwap(false)}
          visible={confirmModalSwap}
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
                <p>Comprar</p>
                <p>
                  {amountToSwap} {coinValue.id}
                </p>
              </div>
              <div className="flex items-start justify-between gap-2">
                <p>Recibir</p>
                <p>{amounToRecieve} GMK</p>
              </div>
            </div>
            <div>
              {/* Input Confirm transaction with password with label tailwindcss */}
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
                  setConfirmModalSwap(false);
                  setLoadingSwap(false);
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
                  if (coinValue.id === "USDT") {
                    try {
                      const privateKey = await getPrivateKey(
                        passwordSecret,
                        userSession?.user?.address as string
                      );
                      const res = await buyGMKWithUSDTWithoutWallet(
                        Number(amountToSwap) || 0,
                        privateKey,
                        userSession?.user?.address as string
                      );
                      getBalances();
                      setLoadingSwap(false);
                      setConfirmModalSwap(false);
                      Swal.fire({
                        title: "Success",
                        text: "Transaction completed",
                        icon: "success",
                        confirmButtonText: "Ok",
                      });
                      setPasswordSecret("");
                    } catch (error: any) {
                      console.log(error);
                      setPasswordSecret("");
                      setLoadingSwap(false);
                      setConfirmModalSwap(false);
                      Swal.fire({
                        title: "Error",
                        text: error.message,
                        icon: "error",
                        confirmButtonText: "Ok",
                      });
                    }
                  } else if (coinValue.id === "BNB") {
                    try {
                      // getTransactionPrivateKeyAndAddress
                      const privateKey = await getPrivateKey(
                        passwordSecret,
                        userSession?.user?.address as string
                      );
                      console.log(privateKey);
                      const res = await buyGMKWithBNBWithoutWaller(
                        Number(amountToSwap) || 0,
                        privateKey,
                        userSession?.user?.address as string
                      );
                      getBalances();
                      console.log(res);
                      setLoadingSwap(false);
                      setConfirmModalSwap(false);
                      setPasswordSecret("");

                      Swal.fire({
                        title: "Success",
                        text: "Transaction completed",
                        icon: "success",
                        confirmButtonText: "Ok",
                      });
                    } catch (error: any) {
                      console.log(error);
                      setLoadingSwap(false);
                      setConfirmModalSwap(false);
                      setPasswordSecret("");
                      Swal.fire({
                        title: "Error",
                        text: error.message,
                        icon: "error",
                        confirmButtonText: "Ok",
                      });
                    }
                  }
                }}
              />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  );
};
