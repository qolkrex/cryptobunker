import { GMKABI, PANCAKEABI, TOKENS } from "@/config";
import Web3 from "web3";
import USDT_ABI from "./abi/usdtABI.json";
import GMKNFTABI from "./abi/gmkNFTABI.json";
import ERC20ABI from "@/config/abi/erc20.json";
import { DGSOLCONTRACT, GMKNFTADDRESS } from "@/data/coinsData";
import { IRound } from "@/app/dashboard/rounds/Web3Client";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://data-seed-prebsc-1-s1.binance.org:8545"
  )
);

export const getChainId = async () => {
  try {
    const chainId = await web3.eth.getChainId();
    return chainId;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error al obtener el chainId: ${error?.message}`);
  }
};

export const getUsdtBalance = async (
  address: string,
  usdtAddress: string = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"
) => {
  try {
    if (!address) {
      return 0;
    }
    if (address === "") return 0;
    if (address === "0x0") return 0;
    const usdtContract = new web3.eth.Contract(USDT_ABI, usdtAddress) as any;
    const usdtBalance = await usdtContract.methods.balanceOf(address).call();
    if (usdtBalance === "0" || Number(usdtBalance) === 0) return 0;
    // wei to usdt
    return Number(usdtBalance) / 1e18;
  } catch (error: any) {
    console.log(error);
    return 0;
    // throw new Error(`Error al obtener el balance: ${error?.message}`);
  }
};
export const getGMKBalanceFromAddress = async (address: string) => {
  if (address === "") return 0;
  if (address === "0x0") return 0;
  try {
    const gmkContract = new web3.eth.Contract(USDT_ABI, DGSOLCONTRACT) as any;
    const gmkBalance = await gmkContract.methods.balanceOf(address).call();
    // wei to usdt
    return Number(gmkBalance) / 1e18;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error al obtener el balance: ${error?.message}`);
  }
};

export const buyGMKWithUSDT = async (amount: number, address: string) => {
  try {
    const WEIAmount = amount * 1e18;
    const gmkContract = new web3.eth.Contract(
      GMKABI,
      TOKENS.GMK.address
    ) as any;
    const tx = await gmkContract.methods.buyPublicSaleToken(WEIAmount).send({
      from: address,
      gas: 300000,
    });
    console.log(tx);
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error al comprar GMK: ${error?.message}`);
  }
};

export const buyGMKWithBNB = async (amount: number, address: string) => {
  try {
    const WEIAmount = amount * 1e18;
    const gmkContract = new web3.eth.Contract(
      GMKABI,
      TOKENS.GMK.address
    ) as any;
    const tx = await gmkContract.methods.buyPublicSaleEth().send({
      from: address,
      value: WEIAmount,
      gas: "500000",
      gasPrice: "10000000000",
    });
    console.log(tx);
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error al comprar GMK: ${error?.message}`);
  }
};

export const gmkBalanceOf = async (address: string) => {
  if (address === "") return 0;
  try {
    if (!address) {
      return 0;
    }
    const gmkContract = new web3.eth.Contract(
      GMKABI,
      TOKENS.GMK.address
    ) as any;
    const balance = await gmkContract.methods.balanceOf(address).call();
    if (!balance) return 0;
    if (balance === "0" || Number(balance) === 0) return 0;
    return Number(balance.toString()) / 1e8;
  } catch (error: any) {
    console.log(error);
    // throw new Error(`Error al obtener el balance: ${error?.message}`);
    return 0;
  }
};

export const getETHBalance = async (address: string) => {
  if (address === "") return 0;
  try {
    const balance = await web3.eth.getBalance(address);
    return Number(balance) / 1e18;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error al obtener el balance: ${error?.message}`);
  }
};

export const getOwner = async () => {
  try {
    const gmkContract = new web3.eth.Contract(
      GMKABI,
      TOKENS.GMK.address
    ) as any;
    const owner = await gmkContract.methods.owner().call();
    // console.log(`Owner: ${owner}`);
    return owner.toLowerCase();
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error al obtener el owner: ${error?.message}`);
  }
};

export const getTotalSupplyNFT = async () => {
  try {
    const gmkContract = new web3.eth.Contract(GMKNFTABI, GMKNFTADDRESS) as any;
    const totalSupply = await gmkContract.methods.totalSupply().call();
    console.log(`Total Supply: ${totalSupply}`);
    return totalSupply;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error al obtener el total supply: ${error?.message}`);
  }
};

export const getOwnedNFTs = async (address: string) => {
  try {
    const gmkContract = new web3.eth.Contract(GMKNFTABI, GMKNFTADDRESS) as any;
    const ownedNFTs = await gmkContract.methods.getOwnedTokens(address).call();
    console.log(`Owned NFTs: ${ownedNFTs}`);
    console.log(ownedNFTs);
    return ownedNFTs;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error al obtener los NFTs: ${error?.message}`);
  }
};

export const getOwnedNFTsWithURI = async (address: string) => {
  if (address === "") return [];
  try {
    const gmkContract = new web3.eth.Contract(GMKNFTABI, GMKNFTADDRESS) as any;
    const ownedNFTs = await gmkContract.methods
      .getOwnedTokensWithURI(address)
      .call();
    const resultadosFetch = [];
    console.log(ownedNFTs);
    for (const uri of ownedNFTs) {
      // const response = await fetch(`${uri}.jpg`);
      // console.log(uri)
      // console.log(response)
      // const data = await response.json();
      // console.log(data)
      resultadosFetch.push(`${uri}.jpg`);
    }
    console.log(resultadosFetch);
    console.log(`Owned NFTs: ${ownedNFTs}`);
    console.log(ownedNFTs);
    return resultadosFetch;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error al obtener los NFTs: ${error?.message}`);
  }
};

export const allowance = async (account: string) => {
  try {
    const gmkContract = new web3.eth.Contract(ERC20ABI, GMKNFTADDRESS) as any;
    const response = await gmkContract.methods
      .allowance(account, account)
      .call();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getGMKPriceInUSD = async () => {
  try {
    const gmkContract = new web3.eth.Contract(
      GMKABI,
      TOKENS.GMK.address
    ) as any;
    const price = await gmkContract.methods.gmkPriceInUSDT().call();
    return Number(price) / 1e18;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error al obtener el precio: ${error?.message}`);
  }
};

export const getCurrentRoundInfo = async () => {
  try {
    const gmkContract = new web3.eth.Contract(
      GMKABI,
      TOKENS.GMK.address
    ) as any;
    const info = await gmkContract.methods.getInfoCurrentRound().call();
    const amountCollected = await gmkContract.methods
      .getUSDTCollectedInRound(Number(info.numberofRound))
      .call();
    // Filtrar solo las propiedades con nombres y convertir BigInt a número
    const propiedadesConNombres = Object.fromEntries(
      Object.entries(info)
        .filter(([key]) => isNaN(parseInt(key)) && key !== "__length__")
        .map(([key, value]) => {
          if (typeof value === "bigint") {
            return [key, Number(value)];
          }
          return [key, value];
        })
    );

    const infoParseWEI: IRound = {
      numberofRound: Number(propiedadesConNombres.numberofRound),
      dateStartRound: Number(propiedadesConNombres.date),
      priceGMKInUSDT: Number(propiedadesConNombres.priceGMK) / 1e18,
      maxGMKSelled: Number(propiedadesConNombres.maxGMKSelled) / 1e8,
      amountGMKxNFT: Number(propiedadesConNombres.amountGMKxNFT),
      currentGMKSelled: Number(propiedadesConNombres.currentGMKSelled) / 1e8,
      currentUSDTCollected: Number(amountCollected) / 1e18,
      isActive: Boolean(propiedadesConNombres.isActive),
    };
    return infoParseWEI;
  } catch (error) {
    console.log(error);
    throw new Error(`Error al obtener el precio`);
  }
};

export const getPriceGMKCurrentRound = async () => {
  try {
    const curentRound = await getCurrentRoundInfo();
    if (curentRound) {
      console.log(curentRound);
      return curentRound.priceGMKInUSDT;
    }
  } catch (error) {
    console.log(error);
    return 0.0;
  }
};
export const getGMKPriceInBNB = async (amount: number) => {
  try {
    const amountInWEI = Math.ceil(amount * 1e18);
    const gmkContract = new web3.eth.Contract(
      PANCAKEABI,
      "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"
    ) as any;
    const response = await gmkContract.methods
      .getAmountsIn(amountInWEI, [
        "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
        "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
      ])
      .call();
    return Number(response[0]) / 1e18;
    // return Number("23032214852630451") / 1e18;
  } catch (error) {
    console.log(error);
    return error;
  }
};
