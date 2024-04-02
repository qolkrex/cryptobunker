export const NETWORKS = {
  bnb: {
    chainId: `0x${Number(56).toString(16)}`,
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com/"],
  },
  celo: {
    chainId: `0x${Number(42220).toString(16)}`,
    chainName: "Celo",
    nativeCurrency: {
      name: "CELO",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: ["https://forno.celo.org"],
    blockExplorerUrls: ["https://celoscan.io/"],
  },
  testnet: {
    chainId: `0x${Number(44787).toString(16)}`,
    chainName: "Celo Alfajores Testnet",
    nativeCurrency: {
      name: "CELO",
      symbol: "CELO",
      decimals: 18,
    },
    rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
    blockExplorerUrls: ["https://celoscan.io"],
  },
  morv: {
    chainId: `0x${Number(1285).toString(16)}`,
    chainName: "Moonriver",
    nativeCurrency: {
      name: "Moonriver",
      symbol: "MOVR",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.moonriver.moonbeam.network"],
    blockExplorerUrls: ["https://moonriver.moonscan.io/"],
    iconUrls: [
      "https://raw.githubusercontent.com/zenlinkpro/assets/master/blockchains/moonriver/assets/0x98878B06940aE243284CA214f92Bb71a2b032B8A/logo.png",
    ],
  },
  optimism:{
    chainId: `0x${Number(10).toString(16)}`,
    chainName: "Optimism",
    nativeCurrency: {
      name: "Optimism",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.optimism.io"],
    blockExplorerUrls: ["https://optimistic.etherscan.io/"],
    iconUrls: [
      "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
    ],
  },
  bsctestnet: {
    chainId: `0x${Number(97).toString(16)}`,
    chainName: "BSC Testnet",
    nativeCurrency: {
      name: "tBNB",
      symbol: "tBNB",
      decimals: 18,
    },
    rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
    blockExplorerUrls: ["https://testnet.bscscan.com/"],
  },
};

export const WEB3_NETWORK_MAINNET =
  "https://celo-mainnet.infura.io/v3/6bbfcbeb9e0d49ae80b539a6daa4fdf6";
export const WEB3_NETWORK_TESTNET =
  "https://polygon-testnet.blastapi.io/f2852ea6-ff68-4a6b-a159-0c870b206601";

export const WEB3_NETWORK_MONNRIVER =
  "https://moonriver.api.onfinality.io/rpc?apikey=4cc1072b-afe8-4d8d-b11b-53b298e6e6bc";

export const WEB3_NETWORKWAR_MAINNET =
  "https://celo-mainnet.infura.io/v3/6bbfcbeb9e0d49ae80b539a6daa4fdf6";

// export const CHAIN_ID_MAINNET_BNB = `0x${Number(56).toString(16)}`;
export const CHAIN_ID_MAINNET_BNB = `0x${Number(10).toString(16)}`;
export const CHAIN_ID_MAINNET = `0x${Number(42220).toString(16)}`;
export const CHAIN_ID_TESTNET = `0x${Number(44787).toString(16)}`;
export const CHAIN_ID_BSC_TESTNET = `0x${Number(97).toString(16)}`;
