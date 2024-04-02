import { ICoin } from "../../../public/interfaces/Row";
import { createContext } from "react";

interface CoinContextProps {
    coins: any[];
    price: number;
    value0: string;
    value1: string;
    handleSelected: (coins: ICoin[]) => void,
    handleValues: (value0: string, value1: string) => void,
    handleValue0: (value0: string) => void,
    handleValue1: (value1: string) => void,
    handlePrice: () => void,
}

// const INIT = {
//     coins: [],
//     price: 0,
//     value0: 0,
//     value1: 0,
//     handleSelected: () => { },
//     handleValues: () => { },
//     handlePrice: () => { },
//     handleValue0: () => { },
//     handleValue1: () => { },
// };

export const CoinContext = createContext({} as CoinContextProps);;
