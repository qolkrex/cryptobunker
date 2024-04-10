import React from "react";
import { CustomTableDepositAndWithdraw } from "./components/Table";

const DepositWithdraw = () => {
  return (
    <div className="px-4 max-w-[760px] mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-monserrat font-bold">
          Depositar & Retirar
        </h1>
        <p className="font-normal">
          Aquí podrás depositar y retirar tus fondos de la plataforma.
        </p>
      </div>
      <CustomTableDepositAndWithdraw />
    </div>
  );
};

export default DepositWithdraw;
