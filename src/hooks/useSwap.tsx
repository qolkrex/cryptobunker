import { IID } from "../../public/interfaces/Row";
import { CONTRACTS } from "@/config";
import { PreloaderContext, Web3Context } from "@/context";
import { coins } from "@/data/coinsData";
import { getBalance } from "@/utils/balance";
import { TokenKey, allowance, approve } from "@/utils/er20";
import { useCallback, useContext, useEffect, useState } from "react";
// import { coins } from "../../../../SecondFloor/components/Exchange/components/Liquidity/coinData";
// import { Web3Context } from "../../../../../../contexts/Web3/Web3Context";
// import { PreloaderContext } from "../../../../../../contexts/Preloader/PreloaderContext";
// import { IID } from "../../../../SecondFloor/components/Row/interfaces";
// import { allowance, approve } from "../../../../../../utils/er20";
// import { getBalance } from "../../../../../../utils/balance";
// import { CONTRACTS } from "../../../../../../config";

const init: {
    id: string,
    icon: string,
    description: string,
    filter: string[],
    balance: number,
    selected: string,
} = coins.USDT;

const initState = {
    priceXToken0: 0.0,
    priceXToken1: 0.0,
};

export const useSwap = () => {
    const { web3 } = useContext(Web3Context);
    const { handlePreloader } = useContext(PreloaderContext);
    const [coinValue, setCoinValue] = useState<IID>(init as any);
    const [route, setRoute] = useState<any>(null);
    const [approvate, setAprrovate] = useState(0);
    const [balance, setBalance] = useState(0.0);
    const [swapState, setSwapState] = useState(initState);

    const handleSwapChange = (newValues: IID, selected: string): void => {
        selected != ""
            ? setCoinValue({
                ...coinValue,
                selected,
            })
            : setCoinValue(newValues);
    };

    const handleChange = useCallback(
        (coin: any, selected: any) => {

            const coinId = coin as TokenKey;

            setCoinValue({
                ...coins[coinId],
                selected,
            });
        },
        [setCoinValue]
    );

    const handleSwapState = (data: any, reset = false) => {
        reset ? setSwapState(initState) : setSwapState(data);
    };

    const handleApprove = () => {
        handlePreloader(true);
        approve(web3?.wallet, web3!.account, coinValue.id, CONTRACTS.swap).then(() => {
            allowance(web3?.wallet, web3!.account, coinValue.id, CONTRACTS.swap).then((resolve) => {
                resolve > 0 ? setAprrovate(resolve) : setAprrovate(0);
                handlePreloader(false);
            }).catch(e => console.log(e));
        });
    };

    useEffect(() => {
        web3?.account != "" &&
            web3?.wallet !== null &&
            getBalance(web3?.wallet, web3?.chainId, web3!.account, coinValue.id).then((resolve: any) => {
                setBalance(resolve);
            });
    }, [web3?.account, web3?.wallet, coinValue.id, web3?.chainId]);

    useEffect(() => {
        web3?.account != "" &&
            web3?.wallet !== null &&
            allowance(web3?.wallet, web3!.account, coinValue.id, CONTRACTS.swap).then((resolve) => {
                resolve > 0 ? setAprrovate(resolve) : setAprrovate(0);
            }).catch(e => console.log(e));
    }, [coinValue.id, web3?.account, web3?.wallet]);

    return {
        swapState,
        coinValue,
        approvate,
        balance,
        route,
        setBalance,
        handleSwapState,
        handleSwapChange,
        handleApprove,
        setRoute,
        handleChange
    };
};
