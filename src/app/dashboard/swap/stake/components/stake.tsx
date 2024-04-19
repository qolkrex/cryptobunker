"use client";
import ButtonBase from "@/components/common/buttons/ButtonBase";
import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
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
    <div className="w-full max-w-[95%] mx-auto px-2 md:px-4 py-2 md:py-4 my-5 mb-10 bg-[#414141] text-white md:max-w-[700px]">
      <TabView panelContainerClassName="bg-[#414141] text-white">
        <TabPanel header="Staking">
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
          <hr className="my-5 opacity-45" />
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
        </TabPanel>
        <TabPanel header="Stake Founders">
          <p className="text-center text-lg md:text-xl font-bold mt-5 md:mt-8">
            ¡Founders de CryptoBunker!
          </p>
          <p className="mt-5">
            ¡Felicidades por unirte a nosotros como uno de nuestros fundadores!
            Para comenzar a recibir tus recompensas, por favor deposita 50 USDT
            desde tu dirección de usuario en el smart contract de fundadores de
            CryptoBunker en la dirección:
            <span className="font-bold">
              {" "}
              0xb90a69a6e0aae83ba3a65d0bf9a4626d1bdb3a78{" "}
            </span>
            . Una vez que hayas realizado el depósito, estarás en la whitelist y
            comenzarás a recibir tus recompensas a partir del 1 de julio de
            2024.
          </p>
          <p className="mt-5">
            Como agradecimiento por tu inversión inicial, recibirás una parte
            proporcional del 0.05% de todas las transacciones realizadas en
            CryptoBunker, compartido entre todos los fundadores, durante un
            período de 24 meses.
          </p>
          <p className="mt-5 font-bold">¿Cómo recibir tus recompensas?</p>
          <p className="mt-2">
            Tus recompensas se acumularán automáticamente en tu cuenta a medida
            que se realicen las transacciones en CryptoBunker. Para cobrar tus
            recompensas, simplemente presiona el botón "Retirar" en esta
            ventana, será actualizada en la fecha final del whitelist.
          </p>
          <p className="mt-5 font-bold">Condiciones para el retiro:</p>
          <ul className="list-disc list-inside mt-2">
            <li>El saldo mínimo para retirar es de 30 DGSOL.</li>
            <li>
              Puedes retirar tus recompensas en cualquier momento que desees,
              siempre que el saldo mínimo sea alcanzado.
            </li>
            <li>
              Una vez que presiones el botón "Retirar", tus recompensas serán
              transferidas automáticamente a tu billetera.
            </li>
          </ul>
          <p className="mt-5">
            ¡Gracias por ser parte de nuestra comunidad de fundadores en
            CryptoBunker!
          </p>
          <div className="mt-5 flex items-center gap-3">
            <p>
              Recompensas: <span className="font-bold">0.0000 DGSOL</span>
            </p>
            <button
              disabled
              className="disabled:opacity-70 disabled:cursor-not-allowed bg-[#333333] px-5 py-2 rounded-md text-white"
            >
              Retirar
            </button>
            <p className="text-yellow-400">
              Aún no eres un founder{" "}
            </p>
          </div>
        </TabPanel>
      </TabView>
    </div>
  );
};
