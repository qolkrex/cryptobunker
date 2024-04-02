import ERC20ABI from "../config/abi/erc20.json";
import { TOKENS } from "../config/index";
import { amountBigReverse } from "./bigNumber";
import { CHAIN_ID } from "../config";
import { CHAIN_ID_MAINNET_BNB } from "../config/constants/networks";

export type Coin = keyof typeof TOKENS;

const getBalanceCrypto = async (web3:any, account:string) => {
  try {
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(account),
      "ether"
    );
    return parseFloat(balance);
  } catch (e) {
    return 0.0;
  }
};

const getBalanceToken = async (web3:any, account:string, address:string, decimals:number) => {
  try {
    console.log("contract line 20", web3, account, address, decimals);
    const contract = new web3.eth.Contract(ERC20ABI, address);
    const balance = await contract?.methods.balanceOf(account).call();
    return amountBigReverse(balance, decimals);
  } catch (e) {
    console.log(e);
    return 0.0;
  }
};

export const getBalance = async (
  web3:any,
  chainId:string,
  account:string,
  id:string,
  production = true
) => {
  console.log(parseInt(chainId, 16));
  console.log(parseInt(CHAIN_ID_MAINNET_BNB, 16));
  try {
    if (
      parseInt(chainId, 16) === parseInt(CHAIN_ID_MAINNET_BNB, 16) ||
      !production
    ) {
      const tokenId = id as Coin;
      const response =
        tokenId === "BNB"
          ? await getBalanceCrypto(web3, account)
          : await getBalanceToken(
              web3,
              account,
              TOKENS[tokenId].address,
              TOKENS[tokenId].decimals
            );
      return response;
    } else {
      return 0.0;
    }
  } catch (e) {
    console.log(e);
    return 0.0;
  }
};
