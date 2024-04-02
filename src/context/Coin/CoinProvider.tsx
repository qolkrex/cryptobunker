import { FC, useReducer } from "react";
import { CoinContext } from "./CoinContext";
import { CoinReducer } from "./CoinReducer";

interface CoinProviderProps {
    children: React.ReactNode;
}

export interface CoinState {
    coins: any[];
    price: number;
    value0: string;
    value1: string;
}

export const COIN_INITIAL_STATE: CoinState = {
    coins: [],
    price: 0,
    value0: "",
    value1: "",
}

export const CoinProvider: FC<CoinProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(CoinReducer, COIN_INITIAL_STATE);

    const handleSelected = (
        coins: any[] = [],
    ) => {
        dispatch({
            type: "[Coin] - selected coin",
            payload: {
                coins,
            },
        });
    };

    const handleValues = (
        value0: string,
        value1: string,
    ) => {
        dispatch({
            type: "[Coin] - values coin",
            payload: {
                value0,
                value1,
            },
        });
    };

    const handleValue0 = (
        value0: string,
    ) => {
        dispatch({
            type: "[Coin] - value coin 0",
            payload: {
                value0,
            },
        });
    };
    const handleValue1 = (
        value1: string,
    ) => {
        dispatch({
            type: "[Coin] - value coin 1",
            payload: {
                value1,
            },
        });
    };

    const handlePrice = (
        reverse: boolean = false,
    ) => {
        // const price = reverse ?
        //     parseFloat(state.value1) / parseFloat(state.value0) :
        //     parseFloat(state.value0) / parseFloat(state.value1);

        dispatch({
            type: "[Coin] - price coin",
            payload: {
                reverse,
            },
        });
    };

    return (
        <CoinContext.Provider value={{
            ...state,
            handleSelected,
            handleValues,
            handlePrice,
            handleValue0,
            handleValue1
        }}>
            {children}
        </CoinContext.Provider>
    );
};
