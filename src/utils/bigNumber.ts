import Web3 from "web3";
import { TOKENS } from "../config";
const web3 = new Web3();

export const amountMax =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

export const amountBig = (amount:string, decimals:number) => {
  const resolve =
    decimals === 18
      ? web3.utils.toWei(amount, "ether")
      : parseFloat(amount) * Number(`1e+${ decimals }`);
  return resolve;
};

export const amountBigReverse = (amount:string, decimals:number) => {
  const resolve = parseFloat(amount) / Number(`1e+${ decimals }`);
  return resolve;
};

export const amountFiruUSDC = (coin:string, price:string, amount:number, mul = 1) => {
  return coin == "FIRU"
    ? (amount * mul).toString()
    : amountBig(price, TOKENS["USDT"].decimals).toString();
};
