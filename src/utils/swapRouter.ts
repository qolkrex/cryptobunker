import { CONTRACTS } from "../config/index";
import { TOKENS } from "../config/index";
import { ROUTER_METHODS, SWAPABI } from "../config";
import { amountBig } from "./bigNumber";
import { ISwapValues } from "@/interfaces/ISwap";

type TokenKey = keyof typeof TOKENS;

const newContract = (web3: any, account: string) =>
  new web3.eth.Contract(SWAPABI, CONTRACTS.swap, {
    from: account,
  });

export const amountMin = (amount:string | number, slipage: number, type=true) => {
  amount = typeof amount === "string" ? parseFloat(amount) : amount;
  const response = type
    ? amount - amount * (slipage / 1000)
    : amount + amount * (slipage / 1000);
  // console.log(response);
  return response.toString();
};

const getAddressCoin = (array:TokenKey[]) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    (i !== 0 || i !== array.length - 1) &&
      TOKENS[array[i]].type !== "crypto" &&
      newArray.push(TOKENS[array[i]].address);
  }
  return newArray;
};

export const swapExactTokensForTokens = async (
  BN = 0,
  BNM = 0,
  path:string,
  account:string,
  deadLine:number,
  contract:any
) => {
  try {
    const response = await contract.methods[
      ROUTER_METHODS.swapExactTokensForTokens
    ](BN, BNM, path, account, deadLine).send();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const swapExactETHForTokens = async (
  BN: number,
  BNM: number,
  path: string,
  account: string,
  deadLine: number,
  contract: any
) => {
  try {
    const response = await contract.methods[
      ROUTER_METHODS.swapExactETHForTokens
    ](BNM, path, account, deadLine).send({ value: BN });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const swapExactTokensForETH = async (
  BN: number,
  BNM: number,
  path: string,
  account: string,
  deadLine: number,
  contract: any
) => {
  try {
    const response = await contract.methods[
      ROUTER_METHODS.swapExactTokensForETH
    ](BN, BNM, path, account, deadLine).send();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const swapMethod = async (
  web3:any,
	coins:any,
	values:ISwapValues,
	account:string,
	slipage:number,
	deadline:number
) => {
  // console.log("web3", web3);
  // console.log("route", coins);
  // console.log("values", values);
  // console.log("account", account);
  // console.log("slipage", slipage);
  const contract = newContract(web3, account);
  const BN = amountBig(values.token0, coins[0].decimals).toString() as any;
  const BNM = amountMin(amountBig(values.token1, coins[1].decimals), slipage) as any;

  const path = coins[0].name === "ALIT" ? coins[1].pathReverse : coins[0].path;
  if (coins[0].type === "crypto" && coins[1].type === "token") {
    const parseValue1 = amountBig(values.token1, coins[1].decimals) as any;
    console.log("parseValue1", parseValue1);
    const response = await swapExactETHForTokens(
      BN,
      parseValue1,
      path,
      account,
      deadline,
      contract
    );
    return response;
  } else if (coins[0].type === "token" && coins[1].type === "crypto") {
    const response = await swapExactTokensForETH(
      BN,
      BNM,
      path,
      account,
      deadline,
      contract
    );
    return response;
  } else {
    const response = await swapExactTokensForTokens(
      BN,
      BNM,
      path,
      account,
      deadline,
      contract
    );
    return response;
  }
};
