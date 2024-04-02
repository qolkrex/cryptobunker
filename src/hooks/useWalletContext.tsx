"use client";
import { WalletContext } from "@/context/wallet/WalletContext";
import { useContext } from "react";

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet debe ser utilizado dentro de un proveedor WalletProvider');
  }
  return context;
};