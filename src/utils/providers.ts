import WalletConnectProvider from "@walletconnect/web3-provider";

const metamaskInstall = () => {
  window.open(
    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=es",
    "_blank",
    "noopener"
  );
  return true;
};

// TODO: Cambiar a CELO

export const providers = (string:string) => {
  switch (string) {
    case "walletconnect":
      return new WalletConnectProvider({
        rpc: {
          97: "https://data-seed-prebsc-1-s1.binance.org:8545",
          1285: "https://moonriver.api.onfinality.io/rpc?apikey=4cc1072b-afe8-4d8d-b11b-53b298e6e6bc",
          1287: "https://moonbeam-alpha.api.onfinality.io/rpc?apikey=4cc1072b-afe8-4d8d-b11b-53b298e6e6bc",
          42220:
            "https://celo-mainnet.infura.io/v3/6bbfcbeb9e0d49ae80b539a6daa4fdf6",
        },
        qrcodeModalOptions: {
          mobileLinks: ["metamask", "trust"],
        },
        chainId: 1285,
      });

    default:
      return typeof (window as any).ethereum !== "undefined"
        ? (window as any).ethereum // metamask de navegador
        : { validate: true };
  }
};

export const validateMetamask = (provider: any, message: boolean) => {
  provider.validate && message && metamaskInstall();
  if (!provider.validate) {
    (window as any).ethereum.providers?.find !== undefined
      ? (window as any).ethereum.providers.find((provider:any) => {
        provider.isMetaMask &&
          (window as any).ethereum
            .request({ method: "eth_requestAccounts" })
            .then(() => false)
            .catch((e:any) => console.log(e));
      })
      : (window as any).ethereum.request({ method: "eth_requestAccounts" });
  }
};
