import { useContext } from "react";
import CAKEROUTER from "../config/abi/cakeRouter.json";
import { BSC_CONTRACT } from "../config/constants/contracts";
import { amountBigReverse, amountBig } from "../utils/bigNumber";
import { Coin } from "../utils/balance";
import { TOKENS } from "../config";
import { Web3Context } from "@/context";
import { CoinContext } from "@/context/Coin/CoinContext";
export const useAmountsOut = () => {
    const { web3 } = useContext(Web3Context);
    const { coins } = useContext(CoinContext);

    // const getAmountsOut = async (amountIn, path, decimals) => {
    const getAmountsOut = async (amountIn: string) => {
        try {
            const contract = new web3!.network.eth.Contract(
                CAKEROUTER,
                BSC_CONTRACT.swapRouter
            );
            // console.log(contract)
            const [coin0, coin1] = coins;
            // console.log(coins)
            const decimals0 = coin0.decimals;
            const path = coin0.path;
            const pathReverse = coin1.pathReverse;
            const decimals1 = coin1.decimals;
            const address0 = coin0.address;
            const firuAddress = "0x6E8c30f31aF6a5a860aCfDd1d312773cFb280B14";
            // console.log(amountIn, decimals0, path, pathReverse, decimals1, address0)
            // const tokens = [address0, address1];

            // const amountConverted = amountIn * Number(`1e+${decimals0}`);
            // console.log(amountIn, decimals0);
            const amountConverted = amountBig(amountIn, decimals0);
            // console.log(amountConverted)
            // rounded to 8 decimals
            // const amountConverted = Math.round(amountIn * 1e8) / 1e8;
            const amountOut = await contract.methods
                .getAmountsOut(
                    amountConverted,
                    address0 === firuAddress ? pathReverse : path
                )
                .call();

            // const amountOutFormatted = amountOut[1] / Number(`1e+${decimals1}`);
            const amountOutFormatted = amountBigReverse(
                amountOut[amountOut.length - 1],
                decimals1
            );
            console.log(amountOutFormatted);

            return amountOutFormatted.toFixed(8);
        } catch (error) {
            console.log(error);
        }
    };


    const getAmountsOutRouteCELOtoUSDC = async (amountIn: string, token0: string, token1: string): Promise<number> => {
        try {
            const contract = new web3!.network.eth.Contract(
                CAKEROUTER,
                BSC_CONTRACT.swapRouter
            );
            const tokenId0 = token0 as Coin;
            const tokenId1 = token1 as Coin;
            const BN = amountBig(amountIn, TOKENS[tokenId0].decimals);
            const path = [
                TOKENS[tokenId0].address,
                TOKENS[tokenId1].address,
            ];

            const values = await contract?.methods.getAmountsOut(BN, path).call();
            const cusd = amountBigReverse(
                values[1],
                TOKENS[tokenId1].decimals
            );
            return cusd;
        } catch (error) {
            console.log(error);
            return 0;
        }
    };


    return {
        getAmountsOut,
        getAmountsOutRouteCELOtoUSDC
    };
};
