import Image from "next/image";
import { useContext, useEffect } from "react";
import { ISwapValues } from "@/interfaces/ISwap";
import { IID } from "../../../../public/interfaces/Row";
import { CoinContext } from "@/context/Coin/CoinContext";
import { useAmountsOut } from "@/hooks/useAmount";
interface IChange {
    coinValue: IID;
    values: ISwapValues;
    handleChange: (coin: string, selected: string) => void;
    setValues: (values: ISwapValues) => void;
    setRoute: (route: any) => void;
    reserves: any
}

export const Change = ({
    coinValue,
    handleChange,
    values,
    setValues,
    reserves,
    setRoute,
}: IChange) => {

    const { getAmountsOut } = useAmountsOut();
    const { handleSelected, handleValues, handlePrice, coins, handleValue1 } = useContext(CoinContext);

    const handleClick = () => {
        handleChange(coinValue.selected, coinValue.id);
        handleSelected([
            coins[1],
            coins[0],
        ])
        console.log(coins)
    };

    useEffect(() => {
        if (parseFloat(values.token1) > 0) {
            handleValues(
                values.token0,
                values.token1
            )
            handlePrice();
            getAmountsOut(
                values.token0,
            ).then((response) => {
                console.log(response);
                setValues({
                    ...values,
                    token1: response || "",
                });
                handleValue1(response || "");
            });
        }
    }, [coins]);

    return (
        <button
            className="flex flex-col items-center justify-center p-4 mx-auto text-white rounded-full bg-primary hover:bg-yellow-500 transition-colors"
            onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rotate-90">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
            </svg>


        </button>
    );
};
