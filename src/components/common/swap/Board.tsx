"use client";
import {
  buyGMKWithBNB,
  buyGMKWithUSDT,
  getDGSOlPrices,
} from "@/app/dashboard/rounds/Web3Client";
import { TOKENS } from "@/config";
import { NETWORKS } from "@/config/constants/networks";
import { CoinContext } from "@/context/Coin/CoinContext";
import { DGSOLCONTRACT, coins } from "@/data/coinsData";
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
  getGMKPriceInBNB,
  getUsdtBalance,
} from "@/utils/contract/contractInteraction";
import {
  buyDgsolWithBNB,
  buyGMKWithBNBWithoutWaller,
  buyGMKWithUSDTWithoutWallet,
  getPrivateKey,
} from "@/utils/contract/contractWithoutWalletInteraction";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useContext, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { IRowI } from "../../../../public/interfaces/Row";
import { Row } from "./Row";
import { TOKENS_BSC_TEST } from "@/config/constants/tokens";

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
  const [messageBalance, setMessageBalance] = useState("");
  const [hasBalance, setHasBalance] = useState(false);
  const [sellPrice, setSellPrice] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [modalCoins, setModalCoins] = useState(false);
  const [modalToCoins, setModalToCoins] = useState(false);
  const [coinFromSelected, setCoinFromSelected] = useState("USDT");
  const [coinToSelected, setCoinToSelected] = useState("DGSOL");
  const [confirmModalSwapDGSOL, setconfirmModalSwapDGSOL] = useState(false);
  const [dgsolPriceInBNB, setDgsolPriceInBNB] = useState(0);

  const [coinBalances, setCoinBalances] = useState<{ [key: string]: number }>(
    () => {
      const initialBalances: { [key: string]: number } = {};
      Object.keys(TOKENS_BSC_TEST).forEach((key) => {
        initialBalances[key] = 0;
      });
      return initialBalances;
    }
  );
  const [cryptoToSend, setCryptoToSend] = useState(["USDT", "DGSOL"]);

  const [amountFrom, setAmountFrom] = useState<string>("");
  const [amountTo, setAmountTo] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);
  const modalToRef = useRef<HTMLDivElement>(null);

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

  const getCryptoBalance = async () => {
    console.log("33");
    if (userSession?.user?.address) {
      console.log("33");
      // const balances = await Promise.all(
      //   Object.keys(TOKENS_BSC_TEST).map(async (key: string) => {
      //     const balance = await getUsdtBalance(
      //       userSession?.user?.address as string,
      //       TOKENS_BSC_TEST[key].address
      //     );
      //     return {
      //       [key]: balance,
      //     };
      //   })
      // );
      // setCoinBalances(balances);
      const usdtBalance = await getUsdtBalance(
        userSession?.user?.address as string
      );
      const bnbBalance = await getETHBalance(
        userSession?.user?.address as string
      );
      const dgsolBalance = await getUsdtBalance(
        userSession?.user?.address as string,
        DGSOLCONTRACT
      );
      console.log("dsadsa");
      console.log(dgsolBalance);
      setCoinBalances((prev) => {
        return {
          ...prev,
          USDT: Number(usdtBalance.toFixed(4)),
          BNB: Number(bnbBalance.toFixed(4)),
          DGSOL: Number(dgsolBalance.toFixed(4)),
        };
      });
    }
  };

  const getDGSOlPricesCalculate = async (
    from: string,
    to: string,
    amount: number
  ) => {
    console.log(amount);
    console.log(buyPrice);
    console.log(sellPrice);
    return new Promise((resolve, reject) => {
      // fetch(
      //   `https://api.dgswap.solardao.finance/api/v1/price?from=${from}&to=${to}&amount=${amount}`
      // )
      //   .then((res) => res.json())
      //   .then((res) => {
      //     resolve(res);
      //   })
      //   .catch((e) => {
      //     reject(e);
      //   });
      if (from === "USDT" || from === "BUSD") {
        resolve({
          amountTo: amount / buyPrice,
        });
      }
      if(from === "BNB") {
        resolve({
          amountTo: amount / dgsolPriceInBNB,
        });
      }
      if (from === "DGSOL") {
        resolve({
          amountTo: amount * sellPrice,
        });
      }
    });
  };

  const handleSwapDGSOL = async () => {
    try {
      if (Number(amountFrom) > coinBalances[coinFromSelected]) {
        Swal.fire({
          title: "Error",
          text: "Saldo Insuficiente",
          icon: "error",
          confirmButtonText: "Ok",
        });
        return;
      }
      if (coinFromSelected === "USDT") {
        setconfirmModalSwapDGSOL(true);
      } else if (coinFromSelected === "BNB") {
        setconfirmModalSwapDGSOL(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(buyPrice);
    if (buyPrice && buyPrice > 0) {
      getGMKPriceInBNB(buyPrice).then((res: any) => {
        console.log(Number(res));
        setDgsolPriceInBNB(Number(res));
      });
    }
  }, [buyPrice]);


  useEffect(() => {
    console.log("33");
    getCryptoBalance();
  }, [userSession?.user?.address as string]);
  console.log(coinBalances);
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
      getDGSOlPrices()
        .then((res: any) => {
          console.log(res);
          setBuyPrice(res.buyPrice);
          setSellPrice(res.sellPrice);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalCoins(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  useEffect(() => {
    console.log("modalToRef", modalToRef);
    const handleClickOutside = (event: MouseEvent) => {
      console.log("modalToRef", modalToRef.current);
      if (
        modalToRef.current &&
        !modalToRef.current.contains(event.target as Node)
      ) {
        setModalCoins(false);
      }
    };

    if (modalToRef.current) {
      // Verificar que modalToRef.current no sea null
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [modalToRef]);

  useEffect(() => {
    if (Number(amountFrom) === 0 || amountFrom === null) {
      setAmountTo(0);
    }
    if (Number(amountFrom) > 0) {
      getDGSOlPricesCalculate(
        coinFromSelected,
        coinToSelected,
        Number(amountFrom)
      ).then((res: any) => {
        console.log(res);
        setAmountTo(res.amountTo);
      });
    }
  }, [amountFrom]);

  console.log(amountFrom);
  console.log(coinFromSelected);
  console.log(amountTo);
  console.log(TOKENS_BSC_TEST);
  Object.keys(TOKENS_BSC_TEST).map((key: string) => {
    // console.log(key);
    console.log(TOKENS_BSC_TEST[key]);
  });


  return (
    <>
      <div className="flex flex-col pb-5">
        <div className="flex flex-col gap-4 justify-start items-start md:flex-row md:items-start md:justify-between mb-7 mt-4">
          <span className="text-white text-2xl font-bold">Comprar</span>
          <div className="flex flex-col bg-[#333333] px-6 py-2 rounded-xl">
            <span>Precio Compra: {buyPrice && buyPrice.toFixed(2)} USD</span>
            <span>Precio Venta: {sellPrice && sellPrice.toFixed(2)} USD</span>
          </div>
        </div>
        <div className="flex flex-col">
          {/* FROM */}
          <div className="relative">
            <p>Desde:</p>
            <div className="flex border rounded-lg">
              <div
                className="flex items-center justify-between w-full max-w-[150px] py-2 hover:bg-gray-100 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-65 cursor-pointer px-4"
                onClick={() => setModalCoins(!modalCoins)}
              >
                <img
                  src={
                    TOKENS_BSC_TEST[coinFromSelected]?.image ||
                    TOKENS_BSC_TEST["USDT"].image
                  }
                  alt="tether coin"
                  className="w-8 h-8"
                />
                <div>
                  <p>{coinFromSelected}</p>
                  <div>
                    <p className="text-sm">
                      {coinBalances[coinFromSelected] &&
                        coinBalances[coinFromSelected].toFixed(4)}
                    </p>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              <div className="w-full rounded-tr-lg rounded-br-lg overflow-hidden bg-[#414141] border-l">
                <input
                  type="text"
                  className="w-full h-full text-inherit px-3 text-lg bg-inherit"
                  value={amountFrom || ""}
                  onChange={(e) => {
                    let inputValue = e.target.value;
                    // Verifica si el valor ingresado es válido
                    if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                      // Si el valor es solo un punto, añade un cero antes
                      if (inputValue === ".") {
                        inputValue = "0.";
                      }
                      // Convierte el valor a número
                      const numericValue = parseFloat(inputValue);
                      console.log(inputValue);
                      // Si es válido, actualiza el estado
                      setAmountFrom(inputValue);
                    }
                  }}
                />
              </div>
            </div>
            {modalCoins && (
              <div
                ref={modalRef}
                className="flex flex-col gap-2 absolute top-[90px] border left-0 w-full bg-[#414141] rounded-lg z-10 max-w-[155px]"
              >
                {Object.keys(TOKENS_BSC_TEST).map((key: string) => {
                  return (
                    <div
                      className="flex items-center justify-between w-full mx-auto max-w-[155px] py-2 hover:bg-gray-100 hover:bg-opacity-65 cursor-pointer px-4 text-right"
                      onClick={() => {
                        if (key === "DGSOL") {
                          setCoinFromSelected("DGSOL");
                          setCoinToSelected("USDT");
                          setCryptoToSend(["USDT"]);
                          setModalCoins(false);
                          return;
                        }
                        if (key === coinToSelected) {
                          const temp = coinFromSelected;
                          setCoinFromSelected(coinToSelected);
                          setCoinToSelected(temp === "USDT" ? "USDT" : "DGSOL");
                          setModalCoins(false);
                          return;
                        }
                        if (key !== "DGSOL" && coinToSelected === "USDT") {
                          setCoinFromSelected(TOKENS_BSC_TEST[key].symbol);
                          setCryptoToSend(["DGSOL"]);
                          setCoinToSelected("DGSOL");
                          setModalCoins(false);
                          return;
                        }
                        setCoinFromSelected(TOKENS_BSC_TEST[key].symbol);
                        setModalCoins(false);
                      }}
                    >
                      <img
                        src={TOKENS_BSC_TEST[key].image}
                        alt="tether coin"
                        className="w-8 h-8"
                      />
                      <div>
                        <p>{TOKENS_BSC_TEST[key].symbol}</p>
                        <p className="text-sm">
                          {coinBalances[TOKENS_BSC_TEST[key].symbol] &&
                            coinBalances[TOKENS_BSC_TEST[key].symbol].toFixed(
                              4
                            )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <img
            src="/img/icons/change.svg"
            className="w-8 hover:rotate-180 duration-500 mx-auto mt-4
           mb-1 cursor-pointer"
            onClick={() => {
              const temp = coinFromSelected;
              if (temp !== "USDT" && temp !== "DGSOL") {
                return;
              }
              setCoinFromSelected(coinToSelected);
              setCoinToSelected(temp);
            }}
            alt="icon change crypto"
          />
          {/* TO */}
          <div className="relative">
            <p>Hacia:</p>
            <div className="flex border rounded-lg">
              <div
                className="flex items-center justify-between w-full max-w-[150px] py-2 hover:bg-gray-100 hover:rounded-tl-lg hover:rounded-bl-lg hover:bg-opacity-65 cursor-pointer px-4"
                onClick={() => setModalToCoins(!modalToCoins)}
              >
                <img
                  src={
                    TOKENS_BSC_TEST[coinToSelected]?.image ||
                    TOKENS_BSC_TEST["USDT"].image
                  }
                  alt="tether coin"
                  className="w-8 h-8"
                />
                <div>
                  <p>{coinToSelected}</p>
                  <div>
                    <p className="text-sm">
                      {coinBalances[coinToSelected] &&
                        coinBalances[coinToSelected].toFixed(4)}
                    </p>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              <div className="w-full rounded-tr-lg rounded-br-lg overflow-hidden bg-[#414141] border-l">
                <input
                  type="number"
                  className="w-full h-full text-inherit px-3 text-lg bg-inherit"
                  value={amountTo > 0 ? amountTo.toFixed(4) : 0 || ""}
                  onChange={(e) => setAmountTo(Number(e.target.value))}
                />
              </div>
            </div>
            {modalToCoins && (
              <div
                ref={modalToRef}
                className="flex flex-col gap-2 absolute top-[90px] border left-0 w-full bg-[#414141] rounded-lg z-10 max-w-[155px]"
              >
                {cryptoToSend.map((key: string) => {
                  return (
                    <div
                      className="flex items-center justify-between w-full mx-auto max-w-[155px] py-2 hover:bg-gray-100 hover:bg-opacity-65 cursor-pointer px-4 text-right"
                      onClick={() => {
                        if (key === "USDT") {
                          setCoinToSelected("USDT");
                          setCoinFromSelected("DGSOL");
                          setModalToCoins(false);
                          return;
                        }
                        if (key === "DGSOL") {
                          setCoinToSelected("DGSOL");
                          setCoinFromSelected("USDT");
                          setModalToCoins(false);
                          return;
                        }
                        setCoinToSelected(TOKENS_BSC_TEST[key].symbol);
                        setModalToCoins(false);
                      }}
                    >
                      <img
                        src={TOKENS_BSC_TEST[key].image}
                        alt="tether coin"
                        className="w-8 h-8"
                      />
                      <div>
                        <p>{TOKENS_BSC_TEST[key].symbol}</p>
                        <p className="text-sm">
                          {coinBalances[TOKENS_BSC_TEST[key].symbol] &&
                            coinBalances[TOKENS_BSC_TEST[key].symbol].toFixed(
                              4
                            )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="py-4 px-10 rounded-xl bg-primary ring-1 ring-blue-700 hover:bg-primaryHover hover:ring-transparent p-2 text-white text-center flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSwapDGSOL}
              disabled={
                Number(amountFrom) === 0 ||
                amountFrom === null ||
                amountTo === 0 ||
                amountTo === null ||
                Number(amountFrom) > coinBalances[coinFromSelected]
              }
            >
              {Number(amountFrom) > coinBalances[coinFromSelected]
                ? "Saldo Insuficiente"
                : "Swap"}
            </button>
          </div>
        </div>
        {/* 
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
        {/* </div>
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
        /> */}
      </div>
      <div className="flex flex-col items-center justify-center gap-2 text-white text-xl">
        {/* {user?.verified === "unverified" || user?.verified === "rejected" ? (
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
                {!hasBalance ? <p>{messageBalance}</p> : <p>Swap</p>}
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
              {!hasBalance ? <p>{messageBalance}</p> : <p>Swap</p>}
            </Button>
          )
        ) : (
          <></>
        )} */}

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
          onHide={() => setconfirmModalSwapDGSOL(false)}
          visible={confirmModalSwapDGSOL}
          className="w-full max-w-[95%] md:max-w-[450px]"
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
                <p>Envio</p>
                <p>
                  {amountFrom} {coinFromSelected}
                </p>
              </div>
              <div className="flex items-start justify-between gap-2">
                <p>Recibo</p>
                <p>
                  {amountTo.toFixed(4)} {coinToSelected}
                </p>
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
                  setconfirmModalSwapDGSOL(false);
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
                  if (coinFromSelected === "USDT") {
                    try {
                      console.log('entro')
                      console.log("passwordSecret", passwordSecret);
                      const privateKey = await getPrivateKey(
                        passwordSecret,
                        userSession?.user?.address as string
                      );
                      console.log("privateKey", privateKey);
                      const res = await buyGMKWithUSDTWithoutWallet(
                        Number(amountFrom) || 0,
                        privateKey,
                        userSession?.user?.address as string
                      );
                      getCryptoBalance();
                      setLoadingSwap(false);
                      setconfirmModalSwapDGSOL(false);
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
                      setconfirmModalSwapDGSOL(false);
                      Swal.fire({
                        title: "Error",
                        text: error.message,
                        icon: "error",
                        confirmButtonText: "Ok",
                      });
                    }
                  } else if (coinFromSelected === "BNB") {
                    try {
                      console.log('entro')
                      // getTransactionPrivateKeyAndAddress
                      const privateKey = await getPrivateKey(
                        passwordSecret,
                        userSession?.user?.address as string
                      );
                      console.log(privateKey);
                      const res = await buyDgsolWithBNB(
                        Number(amountFrom) || 0,
                        privateKey,
                        userSession?.user?.address as string
                      );
                      console.log(res);
                      getBalances();
                      setLoadingSwap(false);
                      setconfirmModalSwapDGSOL(false);
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
                      setconfirmModalSwapDGSOL(false);
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


