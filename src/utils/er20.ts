import ERC20ABI from "../config/abi/erc20.json";
import { TOKENS } from "../config/index";
import { Coin } from "./balance";
import { amountMax } from "./bigNumber";

export type TokenKey = keyof typeof TOKENS;

export const approve = async (web3:any, account:string, token:string, spender:string) => {
  try {
    const BN = amountMax;
    const tokenId=token as Coin;
    const contract = new web3.eth.Contract(ERC20ABI, TOKENS[tokenId].address, {
      from: account,
    });
    await contract?.methods.approve(spender, BN).send();
  } catch (error) {
    console.log(error);
  }
};

export const allowance = async (web3:any, account:string, token:string, spender:string) => {
  const tokenId=token as Coin;
  try {
    if (
      web3 !== undefined &&
      account !== undefined &&
      TOKENS[tokenId].type === "token"
    ) {
      // const contract = new web3?.eth.Contract(
      const contract = new web3.eth.Contract(ERC20ABI, TOKENS[tokenId].address);
      // console.log("line 28 er20", contract);
      const response = await contract?.methods
        .allowance(account, spender)
        .call();
      console.log("line 30 er20", response);
      return response;
    }
    return 1;
  } catch (error) {
    console.log(error);
  }
};
