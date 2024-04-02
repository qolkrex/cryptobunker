import { NETWORKS } from "../config/constants/networks";
import Wallet from "ethereumjs-wallet";

type NetworkKey = keyof typeof NETWORKS;

export const getAccounts = async (web3: any, handleAccount: any) => {
  try {
    const accounts = await web3.eth.getAccounts();
    handleAccount(accounts[0]);
  } catch (e) {
    return false;
  }
};

export const getChainId = async (web3: any) => await web3.eth.getChainId();

// Funciona solo en Metamask
export const addToken = async (token: any) => {
  try {
    await (window as any)?.ethereum?.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: token.address,
          symbol: token.symbol,
          decimals: token.decimals,
          image: token.image,
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
};

// Funciona solo en Metamask
export const changeNetwork = async (
  web3: any,
  handleChainId: any,
  network: NetworkKey
) => {
  try {
    await web3.currentProvider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...NETWORKS[network],
        },
      ],
    });
    getChainId(web3).then((resolve) => {
      console.log(
        "line 46",
        resolve,
        NETWORKS[network].chainId,
        handleChainId(NETWORKS[network].chainId)
      );
      return (
        resolve === NETWORKS[network].chainId &&
        handleChainId(NETWORKS[network].chainId)
      );
    });
    return true;
  } catch (e) {
    console.log(e);
  }
};

export const createAddress = async () => {
  const privateKeyBuffer = Wallet.generate().getPrivateKey();
  const privateKey = privateKeyBuffer.toString("hex");

  // Create a new wallet
  const wallet = Wallet.fromPrivateKey(privateKeyBuffer);

  // Get the address of the wallet
  const address = wallet.getAddressString();

  return { address, privateKey };
};
