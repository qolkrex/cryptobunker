// "use client";
// import { Chain, Common } from "@ethereumjs/common";
// import { LegacyTransaction } from "@ethereumjs/tx";
// import { bytesToHex } from "@ethereumjs/util";
import ERC20ABI from "@/config/abi/erc20.json";
import { GMKABI, TOKENS } from "@/config";

import { ethers } from "ethers";
import { CUSTODYCONTRACT, DGSOLCONTRACT } from "@/data/coinsData";
import CUSTODYABI from "@/utils/contract/abi/custodyContractABI.json";
import dgsolABI from "@/utils/contract/abi/dgsolABI.json";
import Web3 from "web3";
import { getUsdtBalance } from "./contractInteraction";

// const EthereumTx = require('ethereumjs-tx').Transaction;
// const privateKey = Buffer.from('PRIVATE_KEY', 'hex');
const NODO = "https://data-seed-prebsc-1-s1.binance.org:8545";

export const transferForAddress = async (
  address: string,
  amount: number,
  _privateKey: string,
  from: string,
  contractAddress: string
) => {
  // const web3 = new Web3(NODO);
  try {
    const web3 = new Web3(NODO);
    const account = web3.eth.accounts.privateKeyToAccount("0x" + _privateKey); // Añade '0x' al principio de la clave privada
    const usdtContract = new web3.eth.Contract(
      ERC20ABI,
      contractAddress
    ) as any;

    const amountInWei =
      contractAddress === TOKENS.GMK.address
        ? amount * 1e8
        : web3.utils.toWei(amount.toString(), "ether");

    const data = usdtContract.methods
      .transfer(address, amountInWei)
      .encodeABI();
    const gasPrice = web3.utils.toWei("5", "gwei");

    const tx = {
      from: from, // Agrega la dirección 'from'
      to: contractAddress,
      data: data,
      gasPrice: gasPrice,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, _privateKey);
    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    return txReceipt;
  } catch (error) {
    console.error("Error estimating gas:", error);
    return error;
  }
};

export const buyGMKWithBNBWithoutWaller = async (
  amount: number,
  _privateKey: string,
  from: string
) => {
  try {
    const provider = new Web3(NODO);
    const account = provider.eth.accounts.privateKeyToAccount(
      "0x" + _privateKey
    );
    console.log(account);
    const gmkContract = new provider.eth.Contract(
      GMKABI,
      TOKENS.GMK.address
    ) as any;
    const balance = await provider.eth.getBalance(from);
    console.log(Number(balance) / 1e18);

    const amountInWei = amount * 1e18;
    if (balance < amountInWei) {
      throw new Error(
        "Su saldo es insuficiente para realizar esta transacción."
      );
    }
    const gasPrice = provider.utils.toWei("10", "gwei");
    const data = gmkContract.methods.buyPublicSaleEth().encodeABI();
    const tx = {
      from: account.address,
      to: TOKENS.GMK.address,
      gasPrice,
      gas: 3000000,
      value: amountInWei,
      // gas: provider.utils.toHex(500000),
      data,
    };
    console.log("tx", tx);
    const signedTx = await provider.eth.accounts.signTransaction(
      tx,
      _privateKey
    );
    console.log("signedTx", signedTx);
    const txReceipt = await provider.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log(txReceipt);
    return txReceipt;
  } catch (error) {
    console.error("Error estimating gas:", error);
    throw error;
  }
};

export const buyGMKWithUSDTWithoutWallet = async (
  amount: number,
  _privateKey: string,
  from: string
) => {
  try {
    await checkAndApproveAllowance(
      DGSOLCONTRACT,
      TOKENS.USDT.address,
      ethers.utils.parseUnits(amount.toString(), 18),
      _privateKey
    );
    const balance = await getUsdtBalance(from);
    console.log(balance);

    const provider = new Web3(NODO);
    const account = provider.eth.accounts.privateKeyToAccount(
      "0x" + _privateKey
    );
    const addressFrom = account.address;
    const gasPrice = provider.utils.toWei("10", "gwei");
    const amountInWei = amount * 1e18;
    if (balance * 1e18 < amountInWei) {
      throw new Error("Saldo insuficiente para realizar esta transacción.");
    }
    const dgsolContract = new provider.eth.Contract(
      dgsolABI,
      DGSOLCONTRACT
    ) as any;
    console.log("dgsolContract");
    const data = dgsolContract.methods
      .compra(amountInWei)
      .encodeABI();
    console.log("data");
    const tx = {
      from: addressFrom, // Dirección del remitente
      to: DGSOLCONTRACT, // Dirección del contrato
      gasPrice, // Limite de gas
      data, // Método y parámetros codificados ABI
    };
    console.log(tx);
    const signedTx = await provider.eth.accounts.signTransaction(
      tx,
      _privateKey
    ); // Firmar la transacción con la clave privada
    console.log(signedTx);
    const receipt = await provider.eth.sendSignedTransaction(
      signedTx.rawTransaction
    ); // Enviar la transacción firmada
    console.log(receipt);
    return receipt;
  } catch (error) {
    console.error("Error estimating gas:", error);
    throw error;
  }
};

export const buyDgsolWithBNB = async (
  amount: number,
  _privateKey: string,
  from: string
) => {
  try {
    const provider = new Web3(NODO);
    const account = provider.eth.accounts.privateKeyToAccount(
      "0x" + _privateKey
    );
    console.log(account);
    const dgsolContract = new provider.eth.Contract(
      dgsolABI,
      DGSOLCONTRACT
    ) as any;
    const balance = await provider.eth.getBalance(from);
    console.log(Number(balance) / 1e18);

    const amountInWei = amount * 1e18;
    if (balance < amountInWei) {
      throw new Error(
        "Su saldo es insuficiente para realizar esta transacción."
      );
    }
    const gasPrice = provider.utils.toWei("10", "gwei");
    const data = dgsolContract.methods.compraConBNB().encodeABI();
    const tx = {
      from: account.address,
      to: DGSOLCONTRACT,
      gasPrice,
      gas: 3000000,
      value: amountInWei,
      // gas: provider.utils.toHex(500000),
      data,
    };
    console.log("tx", tx);
    const signedTx = await provider.eth.accounts.signTransaction(
      tx,
      _privateKey
    );
    console.log("signedTx", signedTx);
    const txReceipt = await provider.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log(txReceipt);
    return txReceipt;
  } catch (error) {
    console.error("Error estimating gas:", error);
    throw error;
  }
}

const checkAndApproveAllowance = async (
  spenderAddress: string,
  tokenContractAddress: string,
  amountInWei: ethers.BigNumber,
  privateKey: string
) => {
  try {
    const web3 = new Web3(NODO);
    const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey);
    const addressAccount = account.address;
    console.log("addressAccount", addressAccount);

    const tokenContract = new web3.eth.Contract(
      ERC20ABI,
      tokenContractAddress
    ) as any;

    // const userAddress = await tokenContract.methods.wallet().call();
    // console.log("userAddress", userAddress);

    const currentAllowance = await tokenContract.methods
      .allowance(addressAccount, spenderAddress)
      .call();

    console.log("currentAllowance", currentAllowance);

    if (currentAllowance >= amountInWei) {
      console.log("La asignación actual es suficiente.");
    } else {
      const gasPrice = web3.utils.toWei("5", "gwei");
      const data = tokenContract.methods
        .approve(
          spenderAddress,
          "1157920892373161954235709850086879078532699846656405640394575840079131"
        )
        .encodeABI();

      console.log("data", data);

      const tx = {
        from: addressAccount,
        to: tokenContractAddress,
        gasPrice,
        data,
        gasLimit: web3.utils.toHex(500000),
      };

      console.log("tx", tx);

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      console.log("signedTx", signedTx);
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );
      console.log(receipt);
    }
  } catch (error) {
    console.error(
      "Error al verificar la asignación y realizar la aprobación:",
      error
    );
  }
};

export const addToWhiteListWithAdmin = async (
  address: string,
  privateKey: string
) => {
  try {
    const web3 = new Web3(NODO);
    const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKey); // Crear cuenta desde la clave privada
    console.log(account.address);

    const contractInstance = new web3.eth.Contract(
      CUSTODYABI,
      CUSTODYCONTRACT
    ) as any;

    const gasPrice = web3.utils.toWei("5", "gwei"); // Precio del gas
    const data = contractInstance.methods.addToWhitelist(address).encodeABI();

    const txObject = {
      from: account.address, // Dirección del remitente
      to: CUSTODYCONTRACT, // Dirección del contrato
      gasPrice, // Limite de gas
      data, // Método y parámetros codificados ABI
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      txObject,
      privateKey
    ); // Firmar la transacción con la clave privada

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    ); // Enviar la transacción firmada

    console.log(receipt);
    return receipt;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const setPrivateKeyAndAddress = async (
  address: string,
  privateKey: string,
  password: string,
  privateKeyAccountAdmin: string
) => {
  try {
    const web3 = new Web3(NODO);
    const account = web3.eth.accounts.privateKeyToAccount("0x" + privateKeyAccountAdmin);
    const custodyContract = new web3.eth.Contract(
      CUSTODYABI,
      CUSTODYCONTRACT
    ) as any;

    
    const gasPrice = web3.utils.toWei("5", "gwei");
    const data = custodyContract.methods.setPrivateKey(privateKey, password , address).encodeABI();

    const txObject = {
      from: account.address,
      to: CUSTODYCONTRACT,
      gasPrice,
      data,
    };

    const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKeyAccountAdmin);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log(receipt);
    return receipt;
    
  } catch (error) {
    console.log(error);
    return error;
  }
}

export const getPrivateKey = async (_password: string, address: string) => {
  try {
    console.log({
      _password,
      address,
    });
    const web3 = new Web3(NODO);
    const custodyContract = new web3.eth.Contract(
      CUSTODYABI,
      CUSTODYCONTRACT
    ) as any;
    console.log("entro");
    const resp = await custodyContract.methods
      .getPrivateKey(_password, address)
      .call();
      console.log(resp);
    return resp;
  } catch (error) {
    console.log(error);
    throw new Error("Error: Contraseña incorrecta");
  }
};
