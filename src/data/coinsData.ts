export const coins = {
  USDT: {
    id: "USDT",
    icon: "/img/crypto/TETHER.png",
    description: "Tether",
    filter: ["GMK", "BUSD", "CAKE", "BNB"],
    balance: 0,
    selected: "GMK",
  },
  BUSD: {
    id: "BUSD",
    icon: "/img/crypto/USDC.png",
    description: "Binance USD",
    filter: ["GMK"],
    balance: 0,
    selected: "GMK",
  },
  BNB: {
    id: "BNB",
    icon: "/img/crypto/BNB.png",
    description: "BNB Token",
    filter: ["GMK"],
    balance: 0,
    selected: "GMK",
  },
  GMK: {
    id: "DGSOL",
    icon: "/img/crypto/dgsol-token-2.webp",
    description: "GMK",
    filter: ["USDT", "BUSD", "BNB", "CAKE"],
    balance: 0,
    selected: "USDT",
  },
  //TODO: Add more coins or tokens 
  // OPTIMISM: {
  //   id: "OPTIMISM",
  //   icon: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
  //   description: "Optimism",
  //   filter: ["USDT", "BUSD", "BNB", "CAKE"],
  //   balance: 0,
  //   selected: "GMK",
  // },
};

export const GMKNFTADDRESS = "0xDE969782be2BdEc6CC35A6cb7334b174007efD6E";
export const CUSTODYCONTRACT = "0xd5b29667fdCa90b866330EB8814A7d00e07c0feC"