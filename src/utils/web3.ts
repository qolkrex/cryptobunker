import { CHAIN_ID } from "../config";
import { providers, validateMetamask } from "./providers";

const web3Connect = async (handleWeb3:any, providerString:any, provider:any) => {
  try {
    if (providerString === "walletconnect") {
      provider.networkId =
        typeof CHAIN_ID === "string" ? parseInt(CHAIN_ID, 16) : CHAIN_ID;
      await provider.enable();
    }
    handleWeb3(provider, providerString);
  } catch (e) {
    console.log("cancelado");
  }
};

export const web3Provider = (handleWeb3:any, providerString:any, message = true) => {
  const provider = providers(providerString);
  providerString === "metamask" && validateMetamask(provider, message);
  if (!provider.validate) {
    web3Connect(handleWeb3, providerString, provider);
  }
  return provider;
};

export const getConnected = async () => {
  try {
    if (typeof (window as any)?.ethereum !== undefined) {
      const accounts = await (window as any)?.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        return {
          provider: (window as any)?.ethereum,
          providerString: "metamask",
        };
      }
    }
    return false;
  } catch (err) {
    return false;
  }
};
