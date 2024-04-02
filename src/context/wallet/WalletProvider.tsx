"use client";
import { ReactNode, useEffect, useState } from "react";
import { ICoinInfo, IWalletContextProps, WalletContext } from "./WalletContext";
import { TOKENS } from "@/config";

// Crear un proveedor que utilizará el estado local para manejar la información del saldo
export const WalletProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [walletState, setWalletState] = useState<IWalletContextProps>({
    totalBalance: 0,
    coins: [
      {
        id: 1,
        name: "GMK",
        balance: 0,
        balanceInUsd: 0,
        priceInUSD: 0.01,
        address: TOKENS.GMK.address,
      },
      {
        id: 2,
        name: "USDC",
        balance: 0,
        balanceInUsd: 0,
        priceInUSD: 1,
        address: "",
      },
      {
        id: 3,
        name: "USDT",
        balance: 0,
        balanceInUsd: 0,
        priceInUSD: 1,
        address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
      },
      {
        id: 4,
        name: "BNB",
        balance: 0,
        balanceInUsd: 0,
        priceInUSD: 0,
        address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      },
      // Otras monedas...
    ],
    address: "",
    currency: "USDT",
    isAuthenticated: false,
    // Función para actualizar el saldo de una moneda específica
    updateCoinBalance: (coinId: number, newBalance: number) => {
      setWalletState((prevWalletState) => {
        const updatedCoins = prevWalletState.coins.map((coin) => {
          if (coin.id === coinId) {
            return {
              ...coin,
              balance: newBalance,
              balanceInUsd: newBalance * coin.priceInUSD,
            };
          }
          return coin;
        });
        // Calcular el saldo total en USD sumando los saldos en USD de todas las monedas
        const totalBalanceInUsd = updatedCoins.reduce(
          (total, coin) => total + coin.balanceInUsd,
          0
        );
        return {
          ...prevWalletState,
          coins: updatedCoins,
          totalBalance: totalBalanceInUsd,
        };
      });
    },
    // set address
    setAddress: (address: string) => {
      setWalletState((prevWalletState) => ({
        ...prevWalletState,
        address: address,
      }));
    },
    totalValueInUSD: 0,
    setTotalValueInUSD: (totalValue: number) => {
      setWalletState((prevWalletState) => ({
        ...prevWalletState,
        totalValueInUSD: totalValue,
      }));
    },
    showBalance: true,
    setShowBalance: (show: boolean) => {
      setWalletState((prevWalletState) => ({
        ...prevWalletState,
        showBalance: show,
      }));
    },
  });

  // const isWalletAuthenticated = (window as any).ethereum;

  // useEffect(() => {
  //   if (isWalletAuthenticated) {
  //     (window as any).ethereum.on("accountsChanged", function (accounts: string) {
  //       setWalletState((prevWalletState) => ({
  //         ...prevWalletState,
  //         address: accounts[0],
  //         isAuthenticated: true,
  //       }));
  //     });
  //   }
  // }, [isWalletAuthenticated]);


  useEffect(() => {
    // Calcular el saldo total en USD sumando los saldos en USD de todas las monedas
    const totalBalanceInUsd = walletState.coins.reduce(
      (total, coin) => total + coin.balanceInUsd,
      0
    );

    // Actualizar el campo 'totalBalance' en el estado del contexto
    setWalletState((prevWalletState) => ({
      ...prevWalletState,
      totalBalance: totalBalanceInUsd,
    }));
  }, [walletState.coins]); // Ejecutar el useEffect cuando los saldos de las monedas cambien

  return (
    <WalletContext.Provider value={{ ...walletState }}>
      {children}
    </WalletContext.Provider>
  );
};
