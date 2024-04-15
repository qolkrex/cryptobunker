"use client";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import { FormEvent, useEffect, useState } from "react";
import { getDGSOlPrices } from "./Web3Client";

const RoundsPage = () => {
  const [sellPrice, setSellPrice] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);

  const [showModalPrice, setShowModalPrice] = useState(false);

  const handleNewPriceSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New Price");
  };

  useEffect(() => {
    const getPrices = async () => {
      try {
        const resp: any = await getDGSOlPrices();
        console.log(resp);
        if (resp.sellPrice && resp.buyPrice) {
          setSellPrice(resp.sellPrice);
          setBuyPrice(resp.buyPrice);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPrices();
  }, []);

  console.log(sellPrice, buyPrice);

  return (
    <div className="px-10">
      <div className="flex  justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion de Precios</h2>
        <button
          className="bg-primary px-3 py-2 rounded-md shadow-lg hover:opacity-75 flex items-center gap-2"
          onClick={() => setShowModalPrice(true)}
        >
          <i className="pi pi-plus"></i>
          Nuevos Precios
        </button>
        <Dialog
          visible={showModalPrice}
          header="Nueva Ronda"
          onHide={() => setShowModalPrice(false)}
          // style={{ width: "auto", maxWidth: "500px" }}
          className="w-11/12 md:w-1/2"
          headerClassName="bg-primary text-white"
          draggable={false}
          resizable={false}
        >
          <form onSubmit={handleNewPriceSumbit} className="pt-4">
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="priceGMK">
                  Precio de venta: (precio act: {buyPrice.toFixed(2)})
                </label>
                <input
                  type="number"
                  name="priceGMK"
                  id="priceGMK"
                  className="w-full border border-gray-300 rounded-md p-2"
                  step={0.01}
                />
              </div>
              <div>
                <label htmlFor="maxGMKSelled">
                  Precio de compra: (precio act: {sellPrice.toFixed(2)})
                </label>
                <input
                  type="number"
                  name="maxGMKSelled"
                  id="maxGMKSelled"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <button
                type="submit"
                className="bg-primary px-3 py-2 rounded-md shadow-lg hover:opacity-75 text-white"
              >
                Enviar
              </button>
            </div>
          </form>
        </Dialog>
      </div>

      <div className="flex flex-col gap-2">
        <p>{/* Balance: <span>{Number(balanceGMK / 1e8)}GMK</span> */}</p>
        <hr />
        <div className="flex flex-col md:flex-row gap-2">
          <p>Precio de Compra:</p>
          <p>{buyPrice.toFixed(2)}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <p>Precio de Venta:</p>
          <p>{sellPrice.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default RoundsPage;
