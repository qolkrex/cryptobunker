"use client";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import { FormEvent, useEffect, useState } from "react";
import { getDGSOlPrices, setNewPricesDGSOL } from "./Web3Client";

const RoundsPage = () => {
  const [sellPrice, setSellPrice] = useState(0);
  const [buyPrice, setBuyPrice] = useState(0);
  const [tempSellPrice, setTempSellPrice] = useState(0);
  const [tempBuyPrice, setTempBuyPrice] = useState(0);

  const [showModalPrice, setShowModalPrice] = useState(false);

  const handleNewPriceSumbit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New Price");
    console.log({ tempSellPrice, tempBuyPrice });
    const _tempSellPrice: number = Number(1 / sellPrice);
    const _tempBuyPrice: number = Number(1 / buyPrice);
    console.log({ _tempSellPrice, _tempBuyPrice });
    // const resp = await setNewPricesDGSOL(_tempSellPrice, _tempBuyPrice);
    // console.log(resp);
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
          header="Nuevo Precio"
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
                <h2 className="text-xl font-bold">
                  Calcular precios desde Kambista
                </h2>
                <p className="text-sm text-gray-500">
                  Ingrese los precios de Kambista para calcular los precios de
                  venta y compra de DGSOL
                </p>
                <p>
                  <strong>Nota:</strong> El precio de venta y compra de DGSOL
                  será mayor por 1.5% del precio de Kambista
                </p>
                <div className="flex">
                  <div>
                    <label htmlFor="">Precio Compra</label>
                    <input
                      type="number"
                      name="calculateSellPricesFromKambista"
                      id="sellPriceKambista"
                      className="w-full border border-gray-300 rounded-md p-2"
                      step={0.01}
                      required={false}
                      onChange={(e) => {
                        // setSellPrice value + 1.5%
                        const value = Number(e.target.value);
                        const newSellPrice = value + value * 0.005;
                        setTempSellPrice(newSellPrice);
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="">Precio Venta</label>
                    <input
                      type="number"
                      name="calculateBuyPricesFromKambista"
                      id="buyPriceKambista"
                      className="w-full border border-gray-300 rounded-md p-2"
                      step={0.01}
                      required={false}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        const newBuyPrice = value + value * 0.005;
                        setTempBuyPrice(newBuyPrice);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="sellPriceDGSOL">
                  Precio de venta: (precio act: {(1 / buyPrice).toFixed(2)})
                </label>
                <input
                  type="number"
                  name="sellPriceDGSOL"
                  id="sellPriceDGSOL"
                  className="w-full border border-gray-300 rounded-md p-2"
                  step={0.01}
                  value={tempSellPrice}
                  onChange={(e) => setTempSellPrice(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="buyPriceDGSOL">
                  Precio de compra: (precio act: {(1 / sellPrice).toFixed(2)})
                </label>
                <input
                  type="number"
                  name="buyPriceDGSOL"
                  id="buyPriceDGSOL"
                  className="w-full border border-gray-300 rounded-md p-2"
                  step={0.01}
                  value={tempBuyPrice}
                  onChange={(e) => setTempBuyPrice(Number(e.target.value))}
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
        <hr />
        <div className="flex flex-col md:flex-row gap-2">
          <p>Precio de Compra:</p>
          <p>{(1 / buyPrice).toFixed(2)}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <p>Precio de Venta:</p>
          <p>{(1 / sellPrice).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default RoundsPage;
