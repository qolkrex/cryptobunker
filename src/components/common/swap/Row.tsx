import { ChangeEvent, FC, memo, useCallback, useEffect, useState } from "react";

import { InputContext } from "@/context";
import { CoinContext } from "@/context/Coin/CoinContext";
import { useAmountsOut } from "@/hooks/useAmount";
import { useLoader } from "@/hooks/useLoader";
import { ISwapValues } from "@/interfaces/ISwap";
import { useContext } from "react";
import { IID, IRowI } from "../../../../public/interfaces/Row";
import { Modal } from "./ModalSwap";
import { getGMKPriceInBNB } from "@/utils/contract/contractInteraction";

interface RowProps {
  id: number;
  values: ISwapValues;
  handleFormChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
  coins: IRowI;
  coinValue: IID;
  coin: IID;
  balance?: number;
  setBalance?: (balance: number) => void;
  handleSwapState?: (data: any, reset?: boolean) => void;
  handleSwapChange: (newValues: IID, selected: string) => void;
  setValues: (values: any) => void;
  setRoute: (route: any) => void;
  reserves: any;
  amounToRecieve: number;
  amountToSwap: string;
  setAmountToSwap: React.Dispatch<React.SetStateAction<string>>;
  setAmounToRecieve: React.Dispatch<React.SetStateAction<number>>;
  GMKPrice: number;
  hasBalance?: boolean;
}

const Component: FC<RowProps> = ({
  id,
  values,
  coins,
  coin,
  coinValue,
  balance,
  handleSwapState,
  handleSwapChange,
  handleFormChange,
  setValues,
  setRoute,
  reserves,
  amounToRecieve,
  amountToSwap,
  setAmountToSwap,
  setAmounToRecieve,
  GMKPrice,
  hasBalance,
}) => {
  const [open, setOpen] = useState(false);
  // const [loader, setLoader] = useState(false);
  const { loader, setLoader } = useLoader();
  const [price1USDTinBNB, setPrice1USDTinBNB] = useState(0);
  const handleFormChangeCustom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoader(true);
    const inputValue = e.target.value.trim();
    // Check if the input is a valid number or empty
    const isValidNumber = /^\d+(\.\d*)?$/.test(inputValue);
    const numericValue = isValidNumber ? inputValue : inputValue;
    setAmountToSwap(numericValue.toString());
  };

  const handleAmounToRecieve = useCallback(() => {
    if (coinValue.id === "USDT" && Number(amountToSwap) > 0) {
      setAmounToRecieve(Number(amountToSwap) / GMKPrice);
      setLoader(false);
    } else if (coinValue.id === "BNB" && Number(amountToSwap) > 0) {
      setAmounToRecieve(Number(amountToSwap) / price1USDTinBNB);
      setLoader(false);
    } else {
      setAmounToRecieve(0);
    }
  }, [amountToSwap, coinValue.id, GMKPrice, price1USDTinBNB]);

  // const handleAmountToSwap = useCallback(() => {
  //   if (coinValue.id === "USDT") {
  //     setAmountToSwap(amounToRecieve * GMKPrice);
  //   }

  //   if (coinValue.id === "BNB") {
  //     setAmountToSwap(amounToRecieve * price1USDTinBNB);
  //   }
  // }, [amounToRecieve, coinValue.id, GMKPrice, price1USDTinBNB]);

  useEffect(() => {
    handleAmounToRecieve();
  }, [handleAmounToRecieve]);

  // useEffect(() => {
  //   handleAmountToSwap();
  // }, [handleAmountToSwap]);

  useEffect(() => {
    if (GMKPrice > 0) {
      getGMKPriceInBNB(1).then((res) => {
        const price = GMKPrice * (res as number);
        setPrice1USDTinBNB(Number(price));
      });
    }
  }, [GMKPrice]);

  return (
    <>
      <div className="flex flex-col rounded-xl border">
        <div className="flex flex-row items-center justify-between">
          <div
            className="flex flex-row gap-2 items-center justify-between hover:bg-gray-100 hover:bg-opacity-65 cursor-pointer py-2 px-4 border-r min-w-36 md:min-w-44 rounded-tl-xl rounded-bl-xl"
            onClick={() => id !== 1 && setOpen(true)}
          >
            <div className="flex items-center justify-center">
              <div className="relative">
                <img
                  src={coin?.icon}
                  alt={coin?.description}
                  className="object-contain size-8 md:size-12"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-sm md:text-base">{coin?.id}</p>
              <span className="text-xs">{id === 0 && balance?.toFixed(4)}</span>
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
          <div
            className="flex flex-row items-center justify-between"
            style={{ flexDirection: "column" }}
          >
            {id === 0 && (
              <input
                type="number"
                name={`token${id}`}
                step={"any"}
                value={
                  amountToSwap !== null && amountToSwap !== undefined
                    ? amountToSwap.toString()
                    : ""
                }
                onChange={id === 0 ? handleFormChangeCustom : () => {}}
                autoComplete="off"
                className="w-32 md:w-64 text-2xl text-left py-4 px-3 font-bold outline-none text-white bg-transparent"
                readOnly={hasBalance ? false : true}
              />
            )}
            {id === 1 && (
              <input
                type="number"
                step={"any"}
                className="w-32 md:w-64 text-2xl text-left py-4 px-3 font-bold outline-none text-red bg-transparent"
                value={amounToRecieve}
                // onChange={
                //   id === 1
                //     ? (e) => setAmounToRecieve(Number(e.target.value))
                //     : () => {}
                // }
                readOnly={true}
              />
            )}
            {/* <input type="number" step={"any"} value={testNunmber} onChange={(e) => {}} /> */}
            {/* {id === 0 &&
              (loader ? (
                <p className="text-lg text-white">calculando...</p>
              ) : (
                // <p style={{ width: "100%" }}>calculado</p>
                <></>
              ))} */}
          </div>
        </div>
      </div>

      {open && id === 0 && (
        <Modal
          handleClose={() => setOpen(false)}
          handleSwapChange={handleSwapChange}
          coins={coins}
          filter={[]}
        />
      )}
      {open && id === 1 && (
        <Modal
          handleClose={() => setOpen(false)}
          handleSwapChange={handleSwapChange}
          coins={coins}
          filter={coinValue.filter}
        />
      )}
    </>
  );
};

export const Row = memo(Component);
