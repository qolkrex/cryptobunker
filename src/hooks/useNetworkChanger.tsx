"use client";
import { useEffect, useState } from "react";
import Web3 from "web3";

interface NetworkInfo {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
}

const useNetworkChanger = (initialNetwork: NetworkInfo) => {
  const [currentNetwork, setCurrentNetwork] = useState<number | null>(null);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>(initialNetwork);

  const changeNetwork = async () => {
    try {
      if ((window as any).ethereum) {
        const web3 = new Web3((window as any).ethereum);

        // Solicita al usuario que cambie de red con la información actualizada
        await (window as any).ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkInfo],
        });

        // Actualiza el estado después de cambiar de red
        const updatedNetworkId = await web3.eth.net.getId();
        setCurrentNetwork(Number(updatedNetworkId));
      } else {
        console.error("No se encontró el proveedor Ethereum");
      }
    } catch (error) {
      console.error("Error al cambiar de red:", error);
    }
  };

  useEffect(() => {
    const getNetwork = async () => {
      try {
        if ((window as any).ethereum) {
          const web3 = new Web3((window as any).ethereum);
          const networkId = await web3.eth.net.getId();
          setCurrentNetwork(Number(networkId));
        }
      } catch (error) {
        console.error("Error al obtener la red:", error);
      }
    };

    const handleNetworkChange = () => {
      getNetwork();
    };

    getNetwork();

    if ((window as any).ethereum) {
      (window as any).ethereum.on("chainChanged", handleNetworkChange);
    }

    return () => {
      if ((window as any).ethereum) {
        (window as any).ethereum.off("chainChanged", handleNetworkChange);
      }
    };
  }, []);

  return { currentNetwork, changeNetwork, setNetworkInfo };
};

export default useNetworkChanger;
