'use client'

import { useContext, useState } from "react";

import { allowance, approve } from "../utils/er20";

import { TOKENS } from "../config";
import { amountBigReverse } from "../utils/bigNumber";
import { PreloaderContext } from "@/context";
import { ITokensCelo } from "@/config/constants/tokens";

export const useAprovate = () => {
    const [approvate, setApprovate] = useState(0);
    const { handlePreloader } = useContext(PreloaderContext);

    const handleApprove = (web3: any, account: string, coin: string, contract: string) => {
        handlePreloader(true);
        console.log({ web3 })
        console.log({ account })
        console.log({ coin })
        console.log({ contract })
        approve(web3, account, coin, contract)
            .then(() => {
                allowance(web3, account, coin, contract)
                    .then((resolve: any) => {
                        handlePreloader(false);
                        setApprovate(allowanceComparative(resolve, coin))
                    })
                    .catch((e) => {
                        console.log(e);
                        handlePreloader(false);
                    });
            })
            .catch((e) => {
                console.log(e);
                handlePreloader(false);
            });
    };

    const allowanceComparative = (approvate: string, coin: string) => {
        if (!approvate) return 0;
        const decimal = TOKENS[coin as keyof ITokensCelo].decimals;
        return amountBigReverse(approvate.toString(), decimal)
    }


    return { approvate, setApprovate, handleApprove };
};
