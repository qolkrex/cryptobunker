import { FC } from "react";
import DefaultModal from "../DefaultModal";
import { Coin } from "./Coin";

interface ModalProps {
  handleClose: () => void;
  coins: any;
  filter: any;
  handleSwapChange: (coin: any, selected: string) => void;
}

export const Modal: FC<ModalProps> = ({
  handleClose,
  coins,
  filter,
  handleSwapChange,
}) => {
  return (
    <DefaultModal setOpenModal={handleClose}>
      <div className="flex flex-col">
        <h2>Select a token</h2>
        <hr />

        <div className="flex flex-col gap-3 pt-2">
          {filter.length > 0
            ? filter.map((coin: any) => (
                <Coin
                  id={2}
                  key={coin}
                  coin={coins[coin]}
                  handleClose={handleClose}
                  handleSwapChange={handleSwapChange}
                  selected={coin}
                />
              ))
            : Object.keys(coins).map((coin) => {
                if (coin === "GMK") return;
                return (
                  <Coin
                    id={1}
                    key={coin}
                    coin={coins[coin]}
                    handleClose={handleClose}
                    handleSwapChange={handleSwapChange}
                  />
                );
              })}
        </div>
      </div>
    </DefaultModal>
  );
};
