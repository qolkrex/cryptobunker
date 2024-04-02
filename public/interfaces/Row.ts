import { ISwapValues } from "@/interfaces/ISwap";
import { TokenKey } from "@/utils/er20";
import { ChangeEvent } from "react";

export interface IID {
  id: string;
  icon: string;
  description: string;
  filter: string[];
  balance: number;
  selected: string;
}

export interface IRowI {
  USDT: IID;
  BUSD: IID;
  BNB: IID;
  // CAKE:IID;
  GMK: IID;
}

export interface IRow {
  id: number;
  values: ISwapValues;
  handleFormChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  coins: IRowI;
  coinValue: IID;
  coin: IID;
  balance?: number;
  setBalance?: (balance: number) => void;
  handleSwapState?: (data: any, reset?: boolean) => void;
  handleSwapChange: (newValues: IID, selected: string) => void;
  setValues: (values: any) => void;
  setRoute: (route: any) => void;
  reserves: any;
}

export interface IModal {
  handleClose: () => void;
  handleSwapChange: (newValues: IID, selected: string) => void;
  coins: IRowI;
  filter: string[];
}

export interface ICoin {
  id: number;
  coin: IID;
  selected?: string;
  handleClose: () => void;
  handleSwapChange: (newValues: IID, selected: string) => void;
}
