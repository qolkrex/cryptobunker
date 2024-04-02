import { GMKABI, TOKENS } from "@/config";
import { getOwner } from "@/utils/contract/contractInteraction";
import Web3 from "web3";
import ERC20ABI from "@/config/abi/erc20.json";
import CUSTODYABI from "@/utils/contract/abi/custodyContractABI.json";
import { CUSTODYCONTRACT } from "@/data/coinsData";
import { ethers } from "ethers";

let selectedAccount: string;

export const init = async () => {
  try {
    const provider = (window as any).ethereum;

    if (provider) {
      // Request accounts using eth_requestAccounts
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      // Set the selected account and log accounts
      selectedAccount = accounts[0];

      // Set up an event listener for accountsChanged
      provider.on("accountsChanged", (newAccounts: any) => {
        // Time to reload your interface with newAccounts[0]!
        selectedAccount = newAccounts[0];
      });

      // Initialize Web3 using the provider
      const web3 = new Web3(provider);

      // Initialize your contract
      const gmkContract = new web3.eth.Contract(GMKABI, TOKENS.GMK.address);

      // Return the initialized contract
      return gmkContract;
    } else {
      console.error(
        "La propiedad 'ethereum' no está disponible en este entorno."
      );
    }
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};
export const initCustody = async () => {
  try {
    const provider = (window as any).ethereum;

    if (provider) {
      // Request accounts using eth_requestAccounts
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      // Set the selected account and log accounts
      selectedAccount = accounts[0];

      // Initialize Web3 using the provider
      const web3 = new Web3(provider);

      // Initialize your contract
      const gmkContract = new web3.eth.Contract(CUSTODYABI, CUSTODYCONTRACT);

      // Return the initialized contract
      return gmkContract;
    } else {
      console.error(
        "La propiedad 'ethereum' no está disponible en este entorno."
      );
    }
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};
export const initERC20 = async (address: string) => {
  try {
    const provider = (window as any).ethereum;

    if (provider) {
      // Request accounts using eth_requestAccounts
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });

      // Set the selected account and log accounts
      selectedAccount = accounts[0];

      // Set up an event listener for accountsChanged
      provider.on("accountsChanged", (newAccounts: any) => {
        // Time to reload your interface with newAccounts[0]!
        selectedAccount = newAccounts[0];
      });

      console.log(provider);
      const web3 = new Web3(provider);
      // Initialize your contract
      const gmkContract = new web3.eth.Contract(ERC20ABI, address);

      // Return the initialized contract
      return gmkContract;
    } else {
      console.error(
        "La propiedad 'ethereum' no está disponible en este entorno."
      );
    }
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

const initWithEther = async () => {
  try {
    // Obtener el proveedor de MetaMask
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );

    //Solicitar permisos para acceder a la cuenta del usuario
    await (window as any).ethereum.enable();

    // Obtener el Signer que represaenta la cuenta del usuario
    const signer = provider.getSigner();

    return signer;
  } catch (error) {
    console.log(error);
  }
};

export const getTotalRounds = async () => {
  const gmkContract = await init();
  if (gmkContract) {
    try {
      const totalRounds = await gmkContract.methods.totalRounds().call();
      return Number(totalRounds);
    } catch (error) {
      console.log(error);
      return 0;
    }
  } else {
    console.log("No contract");
    return 0;
  }
};

export const getTotalRoundsInfo = async () => {
  try {
    const totalRounds = await getTotalRounds();
    const roundsInfo: IRound[] = [];
    for (let i = 1; i <= totalRounds; i++) {
      const round = await getRoundInfoByNumberofRound(i);
      roundsInfo.push(round);
    }
    return roundsInfo;
  } catch (error) {
    console.error("Error getting total rounds info:", error);
  }
};

export interface IRoundPayload {
  dateStartRound: number;
  priceGMKInUSDT: number;
  maxGMKSelled: number;
  amountGMKxNFT: number;
}

export interface IRound extends IRoundPayload {
  numberofRound: number;
  currentGMKSelled: number;
  currentUSDTCollected?: number;
  isActive: boolean;
}

export const newRound = async (round: IRoundPayload) => {
  const signer = await initWithEther();
  const gmkContract = new ethers.Contract(TOKENS.GMK.address, GMKABI, signer);
  console.log({ round });
  if (gmkContract) {
    try {
      const priceGMKInUSDT = ethers.utils.parseUnits(
        round.priceGMKInUSDT.toString(),
        18
      );
      const maxGMKSelled = ethers.utils.parseUnits(
        round.maxGMKSelled.toString(),
        8
      );
      console.log({
        priceGMKInUSDT,
        maxGMKSelled,
      });
      const response = await gmkContract.setupRound(
        round.dateStartRound,
        priceGMKInUSDT,
        maxGMKSelled,
        round.amountGMKxNFT
      );
      const receipt = await response.wait();
      console.log(receipt);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  } else {
    console.log("No contract");
    return "No contract";
  }
};

export const getRound = async (roundNumber: number) => {
  const gmkContract = (await init()) as any;
  if (gmkContract) {
    try {
      const round = await gmkContract.methods.Rounds(roundNumber).call();
      console.log(round);
      return round;
    } catch (error) {
      console.log(error);
      return error;
    }
  } else {
    console.log("No contract");
    return "No contract";
  }
};

export const getGMKBalance = async (addresss: string) => {
  const gmkContract = (await init()) as any;
  if (gmkContract) {
    try {
      const balance = await gmkContract.methods.balanceOf(addresss).call();
      console.log(balance);
      return Number(balance);
    } catch (error) {
      console.log(error);
      return 0;
    }
  } else {
    console.log("No contract");
    return "No contract";
  }
};

export const getUSDTBalance = async (address: string) => {
  const gmkContract = (await initERC20(TOKENS.USDT.address)) as any;
  if (gmkContract) {
    try {
      const balance = await gmkContract.methods.balanceOf(address).call();
      console.log(balance);
      return Number(balance);
    } catch (error) {
      console.log(error);
      return 0;
    }
  } else {
    console.log("No contract");
    return "No contract";
  }
};

export const buyGMKWithBNB = async (amount: number, address: string) => {
  try {
    const gmkContract = (await init()) as any;
    const WEIAmount = amount * 1e18;
    console.log(address);
    console.log(WEIAmount);
    const tx = await gmkContract.methods.buyPublicSaleEth().send({
      from: address,
      value: WEIAmount.toString(),
      gas: 3000000,
      gasPrice: "50000000000",
    });
    console.log(tx);
    return tx;
  } catch (error: any) {
    console.log(error);
    if (error?.innerError?.code === 4001) {
      throw new Error(`Error al comprar GMK: Rechazó la transacción`);
    }
    throw new Error(`Error al comprar GMK: ${error?.message}`);
  }
};

// const WEIAmount = Math.ceil(amount * 1e18);
// // await estimateGasAmount(address, TOKENS.GMK.address, WEIAmount);
// console.log("address", address);
// const gmkContract = (await init()) as any;
// console.log(WEIAmount);
// const tx = await gmkContract.methods.buyPublicSaleToken(WEIAmount).send({
//   from: address,
//   gas: 3000000,
//   gasPrice: "50000000000",
// });
// console.log(tx);
// return tx;

export const buyGMKWithUSDT = async (amount: number, address: string) => {
  try {
    const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
    const signer = await initWithEther();
    const gmkContract = new ethers.Contract(TOKENS.GMK.address, GMKABI, signer);

    // Contrato del token USDT
    const usdtContract = new ethers.Contract(
      TOKENS.USDT.address,
      ERC20ABI,
      signer
    );

    // Dirección del contrato GMK
    const gmkAddress = TOKENS.GMK.address;

    // Dirección del usuario
    const userAddress = await signer?.getAddress();

    // Verificar la asignación actual
    const currentAllowance = await usdtContract.allowance(
      userAddress,
      gmkAddress
    );

    console.log("Asignación actual:", currentAllowance.toString());

    if (currentAllowance.gte(amountInWei)) {
      console.log("La asignación actual es suficiente.");
    } else {
      // Realizar la aprobación
      const approveTx = await usdtContract.approve(
        gmkAddress,
        "1157920892373161954235709850086879078532699846656405640394575840079131"
      );
      await approveTx.wait();
      console.log("Aprobación exitosa.");
    }

    // Verificar la asignación después de la aprobación
    const newAllowance = await usdtContract.allowance(userAddress, gmkAddress);
    console.log("Nueva asignación:", newAllowance.toString());

    // Comprar GMK después de la aprobación
    const buyTx = await gmkContract.buyPublicSaleToken(amountInWei);
    const receipt = await buyTx.wait();
    console.log("Compra de GMK exitosa. Recibo:", receipt);

    return receipt;
  } catch (error: any) {
    console.error(error);
    if (error?.innerError?.code === 4001) {
      throw new Error(`Error al comprar GMK: Rechazó la transacción`);
    }
    throw new Error(`Error al comprar GMK: ${error?.message}`);
  }
};

export const getUSDTCollectedInRound = async (numberOfRound: number) => {
  try {
    const gmkContract = (await init()) as any;
    const tx = await gmkContract.methods
      .getUSDTCollectedInRound(numberOfRound)
      .call();
    console.log(tx);
    return Number(tx) / 1e18;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error al comprar GMK: ${error?.message}`);
  }
};

export const getBalanceBNB = async (address: string) => {
  try {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://data-seed-prebsc-1-s1.binance.org:8545"
      )
    );
    var balance = await web3.eth.getBalance(address); //Will give
    // const balance = await web3.eth.getBalance(address);
    return Number(balance) / 1e18;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error al obtener el balance: ${error?.message}`);
  }
};

export const getRoundInfoByNumberofRound = async (numberofRound: number) => {
  const gmkContract = (await init()) as any;
  const info = await gmkContract.methods.getInfoRound(numberofRound).call();
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
};

export const getTotalUSDTCollected = async () => {
  try {
    const totalRounds = await getTotalRounds();
    let totalCollected = 0;

    for (let i = 1; i <= totalRounds; i++) {
      const roundInfo = await getRoundInfoByNumberofRound(i);
      if (roundInfo.currentUSDTCollected !== undefined) {
        totalCollected += roundInfo.currentUSDTCollected;
      }
    }
    console.log("Total USDT Collected from all rounds:", totalCollected);
    return totalCollected;
  } catch (error) {
    console.error("Error getting total USDT collected:", error);
    return 0;
  }
};

export const allowance = async (account: string, spender: string) => {
  try {
    const gmkContract = (await init()) as any;
    const response = await gmkContract.methods
      .allowance(account, spender)
      .call();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const allowanceerc20 = async (account: string) => {
  try {
    const gmkContract = (await initERC20(
      "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"
    )) as any;
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
export const approveerc20 = async (account: string) => {
  try {
    const gmkContract = (await initERC20(
      "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd"
    )) as any;
    const response = await gmkContract.methods
      .approve(account, "100000000000000000000000000")
      .send({
        from: account,
        gas: 200000,
        gasPrice: "20000000000",
      });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const approve = async (account: string) => {
  try {
    const gmkContract = (await init()) as any;
    const response = await gmkContract.methods
      .approve(account, "100000000000000000000000000")
      .send({
        from: account,
      });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const withdraw = async () => {
  try {
    const owner = await getOwner();
    const gmkContract = (await init()) as any;
    const response = await gmkContract.methods
      .withdrawTokenAcepted(owner)
      .send({
        from: selectedAccount,
      });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getBalanceTotal = async () => {
  try {
    const gmkContract = (await init()) as any;
    const response = await gmkContract.methods.getBalanceTotal().call();
    console.log(response);
    console.log(response[0]);
    return Number(response[0]) / 1e18;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const testTokens = async () => {
  try {
    const provider = (window as any).ethereum;
    const tokenAddress = TOKENS.GMK.address;
    await provider.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenAddress,
          symbol: "GMK",
          decimals: 8,
          image:
            "https://raw.githubusercontent.com/gmknetwork/gmk-frontend/main/public/gmk.png",
        },
      },
    });
    const list = await provider.request({
      method: "wallet_getTokenList",
    });
    console.log(list);
  } catch (error) {
    console.log(error);
  }
};

export const mintGMK = async (quantity: number) => {
  try {
    const quantityToMint = Number(quantity) * 1e8;
    const gmkContract = (await init()) as any;
    const response = await gmkContract.methods.mint(quantityToMint).send({
      from: selectedAccount,
      gas: 3000000,
      gasPrice: "50000000000",
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const test = async () => {
  const Web3 = require("web3");
  const Tx = require("ethereumjs-tx").Transaction;

  // Crear una instancia de web3.js conectada a BSC
  const web3 = new Web3("https://bsc-dataseed1.binance.org:443");

  // Direcciones de los contratos del token USDT y del router de PancakeSwap
  const usdtAddress = "0x55d398326f99059ff775485246999027b3197955"; // Dirección del contrato del token USDT en BSC
  const routerAddress = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // Dirección del contrato del router de PancakeSwap en BSC

  // Dirección y clave privada del remitente
  const senderAddress = "0xYourSenderAddress";
  const privateKey = Buffer.from("YourPrivateKey", "hex");

  // Cantidad de BNB a intercambiar
  const amountIn = web3.utils.toWei("0.1", "ether"); // 0.1 BNB

  // Obtener la cantidad de USDT esperada (debes calcularlo previamente)
  const amountOutMin = web3.utils.toHex(1000); // Especifica la cantidad mínima de USDT que deseas recibir

  // Obtener el número de bloque actual
  const block = await web3.eth.getBlockNumber();
  const deadline = block + 1; // Establece un límite de tiempo de 100 bloques

  // Crear un objeto de datos de la transacción para llamar a la función 'swapExactETHForTokens' del router de PancakeSwap
  const data = web3.eth.abi.encodeFunctionCall(
    {
      name: "swapExactETHForTokens",
      type: "function",
      inputs: [
        { type: "uint256", name: "amountOutMin" },
        { type: "address[]", name: "path" },
        { type: "address", name: "to" },
        { type: "uint256", name: "deadline" },
      ],
    },
    [
      amountOutMin,
      [
        web3.utils.toChecksumAddress(
          "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
        ),
        usdtAddress,
      ],
      senderAddress,
      deadline,
    ]
  );

  // Construir la transacción
  const rawTx = {
    from: senderAddress,
    to: routerAddress,
    value: amountIn,
    data: data,
    gasLimit: web3.utils.toHex(300000), // Límite de gas
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")), // Precio del gas
    nonce: await web3.eth.getTransactionCount(senderAddress), // Obtener el nonce
  };

  // Firmar la transacción
  const tx = new Tx(rawTx, { chain: "bsc", hardfork: "petersburg" });
  tx.sign(privateKey);
  const serializedTx = tx.serialize();

  // Enviar la transacción firmada a la red BSC
  const receipt = await web3.eth.sendSignedTransaction(
    "0x" + serializedTx.toString("hex")
  );

  console.log("Transaction hash:", receipt.transactionHash);
};

export const transferUSDTToAddress = async (
  to: string,
  from: string,
  amount: number,
  contractAddress: string
) => {
  try {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const gmkContract = new ethers.Contract(
      contractAddress,
      ERC20ABI,
      signer
    );
    const amountInWEI =
      contractAddress === TOKENS.GMK.address
        ? ethers.utils.parseUnits(amount.toString(), 8)
        : ethers.utils.parseUnits(amount.toString(), 18);
    const response = await gmkContract.transfer(to, amountInWEI);
    console.log(response);
    const tx = await response.wait();
    console.log(tx);
    return response;
    // );
    // const amountInWEI = amount * 1e18;
    // const gmkContract = (await initERC20(TOKENS.USDT.address)) as any;
    // const balance = await gmkContract.methods.balanceOf(from).call();
    // console.log(balance);
    // const response = await gmkContract.methods.transfer(to, amountInWEI).send({
    //   from: from,
    //   gas: 200000,
    //   gasPrice: "20000000000",
    // });
    // console.log(response);
    // return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addToWhiteList = async (address: string) => {
  try {
    console.log(address);
    const custodyContract = (await initCustody()) as any;
    const response = await custodyContract.methods
      .addToWhitelist(address)
      .send({
        from: selectedAccount,
        gas: 200000,
        gasPrice: "20000000000",
      });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addAddressAndPrivateKey = async (
  address: string,
  privateKey: any
) => {
  try {
    console.log({ address, privateKey });
    const custodyContract = (await initCustody()) as any;
    const response = await custodyContract.methods
      .addAddress(address, privateKey)
      .send({
        from: selectedAccount,
        gas: 200000,
        gasPrice: "20000000000",
      });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Error al agregar dirección y clave privada");
  }
};

export const changeUserRole = async (
  address: string,
  role: "validator" | "roundAdmin"
) => {
  try {
    const custodyContract = (await initCustody()) as any;
    if (role === "validator") {
      const response = await custodyContract.methods
        .addValidator(address)
        .send({
          from: selectedAccount,
          gas: 200000,
          gasPrice: "20000000000",
        });
      console.log(response);
    } else if (role === "roundAdmin") {
      // const response = await custodyContract.methods
      //   .add(address)
      //   .send({
      //     from: selectedAccount,
      //   });
      // console.log(response);
    } else {
      throw new Error("Role not found");
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const removeValidator = async (address: string) => {
  try {
    const custodyContract = (await initCustody()) as any;
    const response = await custodyContract.methods
      .removeValidator(address)
      .send({
        from: selectedAccount,
        gas: 200000,
        gasPrice: "20000000000",
      });
    console.log(response);
  } catch (error) {
    console.log(error);
    return error;
  }
};
