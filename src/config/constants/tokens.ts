export const TOKEN_ARRAY = ["USDT", "BUSD", "BNB", "CAKE", "ALIT"];

export interface IToken {
  type: string;
  address: string;
  symbol: string;
  decimals: number;
  image: string;
}
export interface ITokens {
  MOVR: IToken;
  FIRU: IToken;
  CELO: IToken;
  CUSD: IToken;
  USDC: IToken;
  DAI: IToken;
  BUSD: IToken;
  USDT: IToken;
  ETH: IToken;
  BNB: IToken;
  WBTC: IToken;
  ZLK: IToken;
  vETH: IToken;
  xcKSM: IToken;
  xcRMRK: IToken;
  xcKINT: IToken;
  xcKAR: IToken;
}
export interface ITokensCelo {
  // FIRU: IToken;
  // CELO: IToken;
  // CUSD: IToken;
  // USDC: IToken;
  // DAI: IToken;
  // BUSD: IToken;
  // USDT: IToken;
  USDT: IToken;
  BUSD: IToken;
  BNB: IToken;
  // CAKE:IToken
  // ALIT:IToken
}

export interface ITokensBSCTest {
  [key: string]: IToken;
}

export const TOKENS_BSC_TEST: ITokensBSCTest = {
  USDT: {
    type: "token",
    address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    symbol: "USDT",
    decimals: 18,
    image: "/img/crypto/TETHER.png",
  },
  BUSD: {
    type: "token",
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    symbol: "BUSD",
    decimals: 18,
    image: "/img/crypto/USDC.png",
  },
  BNB: {
    type: "crypto",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    symbol: "BNB",
    decimals: 18,
    image: "/img/crypto/BNB.png",
  },
  DGSOL: {
    type: "token",
    address: "0x081F7911DB0D516F311BB4C6644c833B7A89aB04",
    symbol: "DGSOL",
    decimals: 18,
    image: "/img/crypto/dgsol-token-2-white.webp",
  },
};

export const TOKEN_MAINNET = {
  USDT: {
    name: "USDT",
    type: "token",
    address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    symbol: "USDT",
    decimals: 18,
    image:
      "https://media.discordapp.net/attachments/839620709517230081/1066570478954758184/image.png",
    path: [
      "0x55d398326f99059fF775485246999027B3197955",
      "0xfF6AD3a20d03F6b1b148294A5f3e22490520adc8",
    ],
    pathReverse: [
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
      "0x55d398326f99059fF775485246999027B3197955",
    ],
  },
  BUSD: {
    name: "BUSD",
    type: "token",
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    symbol: "BUSD",
    decimals: 18,
    image:
      "https://media.discordapp.net/attachments/839620709517230081/1068219958414278666/logo_busd.png",
    path: [
      "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      "0x55d398326f99059fF775485246999027B3197955",
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
    ],
    pathReverse: [
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
      "0x55d398326f99059fF775485246999027B3197955",
      "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    ],
  },
  BNB: {
    name: "BNB",
    type: "crypto",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    symbol: "BNB",
    decimals: 18,
    image:
      "https://media.discordapp.net/attachments/839620709517230081/1066573866907992154/pngwing.com.png?width=671&height=671",
    path: [
      "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "0x55d398326f99059fF775485246999027B3197955",
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
    ],
    pathReverse: [
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
      "0x55d398326f99059fF775485246999027B3197955",
      "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    ],
  },
  // CAKE: {
  //   name: "CAKE",
  //   type: "token",
  //   address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  //   symbol: "CAKE",
  //   decimals: 18,
  //   image:
  //     "https://media.discordapp.net/attachments/839620709517230081/1066574141408428153/pancakeswap-logo.png",
  //   path: [
  //     "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  //     "0x55d398326f99059fF775485246999027B3197955",
  //     "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
  //   ],
  //   pathReverse: [
  //     "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
  //     "0x55d398326f99059fF775485246999027B3197955",
  //     "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  //   ],
  // },
  GMK: {
    name: "GMK",
    type: "token",
    address: "0x081F7911DB0D516F311BB4C6644c833B7A89aB04",
    symbol: "GMK",
    decimals: 8,
    image:
      "https://media.discordapp.net/attachments/839620709517230081/1199728205565792276/g-token.png?ex=65c398f6&is=65b123f6&hm=cf028d3764e424247ca39235f4939c3d0acab3e678fc361c654a21c394d14b8f&=&format=webp&quality=lossless",
    path: [
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
    ],
    pathReverse: [
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
      "0x55d398326f99059fF775485246999027B3197955",
    ],
  },
  // DGSol: {
  //   name: "DgSOL",
  //   type: "token",
  //   address: "0x081F7911DB0D516F311BB4C6644c833B7A89aB04",
  //   symbol: "DGSOL",
  //   decimals: 18,
  //   image:
  //     "https://media.discordapp.net/attachments/839620709517230081/1199728205565792276/g-token.png?ex=65c398f6&is=65b123f6&hm=cf028d3764e424247ca39235f4939c3d0acab3e678fc361c654a21c394d14b8f&=&format=webp&quality=lossless",
  //   path: [
  //     "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
  //     "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
  //   ],
  //   pathReverse: [
  //     "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
  //     "0x55d398326f99059fF775485246999027B3197955",
  //   ],
  // },
};

export const TOKEN_TESTNET = {
  // MOVR: {
  //   type: "crypto",
  //   address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
  //   symbol: "MATIC",
  //   decimals: 18,
  //   image: "",
  // },
  // FIRU: {
  //   type: "token",
  //   address: "0x83B45DaA4641834C6f796060aFd767373c2eA468",
  //   symbol: "FIRU",
  //   decimals: 8,
  //   image:
  //     "https://raw.githubusercontent.com/zenlinkpro/assets/master/blockchains/moonriver/assets/0x2FBE6b6F1e3e2EFC69495F0c380A01c003e47225/logo.png",
  // },
  // USDC: {
  //   type: "token",
  //   address: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
  //   symbol: "USDC",
  //   decimals: 18,
  //   image:
  //     "https://raw.githubusercontent.com/zenlinkpro/assets/master/blockchains/moonriver/assets/0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D/logo.png",
  // },
  // DAI: {
  //   type: "token",
  //   address: "0x0Ec449159B39e2df3154A0D01cdfB8C1111bDBE8",
  //   symbol: "DAI",
  //   decimals: 18,
  //   image: "",
  // },
  // BUSD: {
  //   type: "token",
  //   address: "0xC4f73f347699f4dd24Cdc353f891940094B88925",
  //   symbol: "BUSD",
  //   decimals: 18,
  //   image: "",
  // },
  // USDT: {
  //   type: "token",
  //   address: "0xBb5fa19E007086f3b9875387960FB1E80E4EF892",
  //   symbol: "USDT",
  //   decimals: 6,
  //   image: "",
  // },
  // ETH: {
  //   type: "token",
  //   address: "0x744eB7c95eCe05B849e84c45A3574e943EeF665B",
  //   symbol: "ETH",
  //   decimals: 18,
  //   image: "",
  // },
  // BNB: {
  //   type: "token",
  //   address: "0xf266a0B8d779d7B756BA288E2315a7eeEB644032",
  //   symbol: "BNB",
  //   decimals: 18,
  //   image: "",
  // },
  // WBTC: {
  //   type: "token",
  //   address: "0xFfFFfFff1FcaCBd218EDc0EbA20Fc2308C778080",
  //   symbol: "WBTC",
  //   decimals: 0,
  //   image: "",
  // },
  // ZLK: {
  //   type: "token",
  //   address: "0x744eB7c95eCe05B849e84c45A3574e943EeF665B",
  //   symbol: "ZLK",
  //   decimals: 18,
  //   image: "",
  // },
  // vETH: {
  //   type: "token",
  //   address: "",
  //   symbol: "vETH",
  //   decimals: 18,
  //   image: "",
  // },
  // xcKSM: {
  //   type: "token",
  //   address: "",
  //   symbol: "xcKSM",
  //   decimals: 12,
  //   image: "",
  // },
  // xcRMRK: {
  //   type: "token",
  //   address: "0xFFffffFfd2aaD7f60626608Fa4a5d34768F7892d",
  //   symbol: "MOVR",
  //   decimals: 10,
  //   image: "",
  // },
  // xcKINT: {
  //   type: "token",
  //   address: "",
  //   symbol: "MOVR",
  //   decimals: 12,
  //   image: "",
  // },
  // xcKAR: {
  //   type: "token",
  //   address: "",
  //   symbol: "xcKINT",
  //   decimals: 12,
  //   image: "",
  // },
  USDT: {
    name: "USDT",
    type: "token",
    address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    symbol: "USDT",
    decimals: 18,
    image:
      "https://media.discordapp.net/attachments/839620709517230081/1066570478954758184/image.png",
    path: [
      "0x55d398326f99059fF775485246999027B3197955",
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
    ],
    pathReverse: [
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
      "0x55d398326f99059fF775485246999027B3197955",
    ],
  },
  BUSD: {
    name: "BUSD",
    type: "token",
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    symbol: "BUSD",
    decimals: 18,
    image:
      "https://media.discordapp.net/attachments/839620709517230081/1068219958414278666/logo_busd.png",
    path: [
      "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      "0x55d398326f99059fF775485246999027B3197955",
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
    ],
    pathReverse: [
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
      "0x55d398326f99059fF775485246999027B3197955",
      "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    ],
  },
  BNB: {
    name: "BNB",
    type: "crypto",
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    symbol: "BNB",
    decimals: 18,
    image:
      "https://media.discordapp.net/attachments/839620709517230081/1066573866907992154/pngwing.com.png?width=671&height=671",
    path: [
      "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      "0x55d398326f99059fF775485246999027B3197955",
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
    ],
    pathReverse: [
      "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
      "0x55d398326f99059fF775485246999027B3197955",
      "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    ],
  },
  // CAKE: {
  //   name: "CAKE",
  //   type: "token",
  //   address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  //   symbol: "CAKE",
  //   decimals: 18,
  //   image:
  //     "https://media.discordapp.net/attachments/839620709517230081/1066574141408428153/pancakeswap-logo.png",
  //   path: [
  //     "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  //     "0x55d398326f99059fF775485246999027B3197955",
  //     "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
  //   ],
  //   pathReverse: [
  //     "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
  //     "0x55d398326f99059fF775485246999027B3197955",
  //     "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
  //   ],
  // },
  GMK: {
    name: "GMK",
    type: "token",
    address: "0x081F7911DB0D516F311BB4C6644c833B7A89aB04",
    symbol: "GMK",
    decimals: 8,
    image:
      "https://media.discordapp.net/attachments/839620709517230081/1199728205565792276/g-token.png?ex=65c398f6&is=65b123f6&hm=cf028d3764e424247ca39235f4939c3d0acab3e678fc361c654a21c394d14b8f&=&format=webp&quality=lossless",
    path: [
      "0xfF6AD3a20d03F6b1b148294A5f3e22490520adc8",
      "0xfF6AD3a20d03F6b1b148294A5f3e22490520adc8",
    ],
    pathReverse: [
      "0xfF6AD3a20d03F6b1b148294A5f3e22490520adc8",
      "0x55d398326f99059fF775485246999027B3197955",
    ],
  },
  // DGSol: {
  //   name: "DGSOL",
  //   type: "token",
  //   address: "0x081F7911DB0D516F311BB4C6644c833B7A89aB04",
  //   symbol: "DGSOL",
  //   decimals: 18,
  //   image:
  //     "https://media.discordapp.net/attachments/839620709517230081/1199728205565792276/g-token.png?ex=65c398f6&is=65b123f6&hm=cf028d3764e424247ca39235f4939c3d0acab3e678fc361c654a21c394d14b8f&=&format=webp&quality=lossless",
  //   path: [
  //     "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
  //     "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
  //   ],
  //   pathReverse: [
  //     "0xc2086B2CD3Fca4A61ccF5C1cd029dBc64d940bcb",
  //     "0x55d398326f99059fF775485246999027B3197955",
  //   ],
  // },
};
