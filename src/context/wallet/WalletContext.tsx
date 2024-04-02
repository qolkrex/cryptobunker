import { createContext } from 'react';

export interface ICoinInfo {
  id: number;
  name: string;
  balance: number;
  balanceInUsd: number;
  image?: string;
  priceInUSD: number;
  address?: string;
}

export interface IWalletContextProps {
  totalBalance: number;
  coins: ICoinInfo[];
  currency: string; // una stablecoin
  address: string;
  isAuthenticated: boolean;
  updateCoinBalance: (coinId: number, newBalance: number) => void;
  setAddress: (address: string) => void;
  totalValueInUSD: number;
  setTotalValueInUSD: (totalValue: number) => void;
  showBalance: boolean;
  setShowBalance: (show: boolean) => void;
}

export const WalletContext = createContext<IWalletContextProps | undefined>(undefined);

