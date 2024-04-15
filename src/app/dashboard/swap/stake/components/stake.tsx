"use client";
import ButtonBase from "@/components/common/buttons/ButtonBase";
import React, { useEffect, useState } from "react";

export const StakeComponent = () => {
  const [quantity, setQuantity] = useState(0);
  const [time, setTime] = useState(0);
  const [totalRecieve, setTotalRecieve] = useState(0);

  useEffect(() => {
    console.log(quantity, time);
    if (quantity && time) {
      setTotalRecieve(quantity + quantity * (time / 100));
    }
  }, [quantity, time]);
  return (
    <div className="w-full max-w-[95%] mx-auto px-2 md:px-4 py-2 md:py-5 bg-[#414141] text-white md:max-w-[560px]">
      <h2 className="text-lg font-bold">Staking</h2>
      <div className="flex flex-col gap-2 mt-2 md:mt-5">
        <div className="flex flex-col gap-2">
          <label>Cantidad de DgSol:</label>
          <input
            type="number"
            className="w-full bg-[#333333] text-white p-2 rounded-md"
            value={quantity || ""}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Tiempo de Staking:</label>
          <select
            className="w-full bg-[#333333] text-white p-2 rounded-md"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
          >
            <option>Seleccione Tiempo</option>
            <option value={1}>1 mes</option>
            <option value={3}>3 meses</option>
            <option value={6}>6 meses</option>
            <option value={8}>8 meses</option>
            <option value={10}>10 meses</option>
            <option value={12}>12 meses</option>
          </select>
        </div>
      </div>
      <hr  className="my-5 opacity-45"/>
      <div>
        {/* Cantidad a recibir */}
        <p> Monto Aproximado a recibir</p>
        <input
          type="text"
          className="w-full bg-[#333333] text-white p-2 rounded-md"
          value={totalRecieve}
          readOnly
        />
      </div>
      <div className="mt-4">
        <ButtonBase>Stake</ButtonBase>
      </div>
    </div>
  );
};
