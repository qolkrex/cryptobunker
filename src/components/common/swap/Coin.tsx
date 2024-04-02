import { FC, useContext, useEffect, useState } from "react";

import { Web3Context } from "@/context";
import {
  getETHBalance,
  getUsdtBalance,
} from "@/utils/contract/contractInteraction";
import { useSession } from "next-auth/react";

interface CoinProps {
  id: number;
  coin: any;
  handleClose: () => void;
  handleSwapChange: (coin: any, selected: string) => void;
  selected?: string;
}
interface BalanceCoin {
  name: string;
  balance: number;
}
export const Coin: FC<CoinProps> = ({
  id,
  coin,
  handleClose,
  handleSwapChange,
  selected = "",
}) => {
  const { web3 } = useContext(Web3Context);
  const { data } = useSession();
  const [balance, setBalance] = useState(0.0);
  const [balanceCoin, setBalanceCoin] = useState<BalanceCoin[]>([
    {
      balance: 0,
      name: "USDT",
    },
    {
      balance: 0,
      name: "OPTIMISM",
    },
    {
      balance: 0,
      name: "BNB",
    },
    {
      balance: 0,
      name: "BUSD",
    },
  ]);

  const handleClick = () => {
    handleSwapChange(coin, selected);
    handleClose();
  };

  useEffect(() => {
    if (coin.id === "USDT") {
      getUsdtBalance(data?.user?.address as string).then((r) => {
        //   setBalance(r);
        setBalanceCoin((oldState) =>
          oldState.map((oState) => {
            if (oState.name === coin.id) {
              return {
                ...oState,
                balance: r,
              };
            }
            return oState;
          })
        );
      });
    }
    if (coin.id === "BNB") {
      getETHBalance(data?.user?.address as string).then((r) => {
        //   setBalance(r);
        setBalanceCoin((oldState) =>
          oldState.map((oState) => {
            if (oState.name === coin.id) {
              return {
                ...oState,
                balance: r,
              };
            }
            return oState;
          })
        );
      });
    }
  }, [data?.user?.address as string]);

  // useEffect(() => {
  //     getBalance(web3?.network, web3?.chainId, web3!.account, coin.id)
  //         .then((r) => setBalance(r))
  //         .catch((e) => console.log(e));
  // }, [coin, web3?.network, web3?.chainId, web3?.account]);

  return (
    <div className="flex">
      <div
        className="flex hover:bg-gray-600 cursor-pointer p-2 rounded
            w-full gap-2 items-center"
        onClick={handleClick}
      >
        <div className="flex items-center justify-center">
          <div className="relative">
            <img
              src={coin?.icon}
              alt={coin?.id}
              className="object-contain size-12"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h5>{coin?.id}</h5>
          <p>{coin?.description}</p>
          <span className="text-xs">
            {balanceCoin.find((c) => c.name === coin.id)?.balance.toFixed(4)}
            {/* {id === 1 && balance > 0 && balance.toFixed(4)} */}
          </span>
        </div>
      </div>
    </div>
  );
};
