import { useCallback, useContext, useState } from "react";
import { CONTRACTS, PAIRS } from "../config/index";
import FACTORYABI from "../config/abi/factory.json";
import PAIRABI from "../config/abi/pair.json";

import { Coin } from "../utils/balance";
import { Web3Context } from "@/context";
import { IPAIRS } from '../config/constants/pair';
import { TOKEN_MAINNET_BNB } from "@/config/constants/tokenMorv";

export const useReserves = () => {
    const [reserves, setReserves] = useState<any>([]);
    const { web3 } = useContext(Web3Context);

    const handleReserves = () => {
        setReserves([]);
        Object.keys(PAIRS).map((pair: string) => {
            const pairKey = pair as keyof IPAIRS;
            PAIRS[pairKey].pair != "" &&
                getReserves(PAIRS[pairKey].pair)
                    .then((resolve) => {
                        setReserves((r: any) => [...r, { ...resolve, pair }]);
                    })
                    .catch((e) => console.log(e));
        });
    };

    const getPair = useCallback(
        async (token0: string, token1: string) => {
            const tokenId0 = token0 as Coin;
            const tokenId1 = token0 as Coin;
            const contract = new web3.networkMorv.eth.Contract(
                // const contract = new web3.network.eth.Contract(
                FACTORYABI,
                CONTRACTS.factory
            );
            return await contract.methods
                .getPair(
                    // TOKENS[token0 as keyof ITokens].address,
                    // TOKENS[token1 as keyof ITokens].address
                    TOKEN_MAINNET_BNB[tokenId0].address,
                    TOKEN_MAINNET_BNB[tokenId1].address
                )
                .call();
        },
        [web3.networkMorv]
        // [web3.network]
    );

    const getReserves = useCallback(
        async (address: string) => {
            const contract = new web3.networkMorv.eth.Contract(PAIRABI, address);
            // const contract = new web3.network.eth.Contract(PAIRABI, address);
            return await contract.methods.getReserves().call();
        },
        [web3.networkMorv]
        // [web3.network]
    );

    const getToken0 = useCallback(
        async (address: string) => {
            const contract = new web3.networkMorv.eth.Contract(PAIRABI, address);
            // const contract = new web3.network.eth.Contract(PAIRABI, address);
            return await contract.methods.token0().call();
        },
        [web3.networkMorv]
        // [web3.network]
    );

    return {
        reserves,
        getToken0,
        getPair,
        getReserves,
        handleReserves,
    };
};
