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
    icon: "/img/crypto/dgsol-token-2-white.webp",
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
export const CUSTODYCONTRACT = "0xd5b29667fdCa90b866330EB8814A7d00e07c0feC";
export const DGSOLCONTRACTPRICE = "0x97161ABc66fA811b9d1440991923921B492fa255";
export const DGSOLCONTRACT = "0x1331891f6D3948C91aA33E9bA08bB770d86Da2e2";
// export const DGSOLCONTRACT = "0x767aEF4554Cd9Ce2a5601bc86ca4017418a8E1fa";