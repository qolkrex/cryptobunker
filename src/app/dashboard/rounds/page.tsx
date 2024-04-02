"use client";
import dayjs from "dayjs";
import "primeicons/primeicons.css";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Row } from "primereact/row";
import { Tag } from "primereact/tag";
import { FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  IRound,
  getTotalRounds,
  getTotalRoundsInfo,
  newRound,
} from "./Web3Client";

const RoundsPage = () => {
  const [totalRounds, setTotalRounds] = useState(0);
  const [totalRoundsInfo, setTotalRoundsInfo] = useState<IRound[]>([]);
  const [showModalRound, setShowModalRound] = useState(false);
  const [dateNewRound, setdateNewRound] = useState(new Date().getTime());

  useEffect(() => {
    getTotalRounds()
      .then((res) => {
        setTotalRounds(res);
      })
      .catch((err) => {
        console.log(err);
      });
    getTotalRoundsInfo()
      .then((res) => {
        if (res) {
          setTotalRoundsInfo(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getSeverity = (isActive: "Activa" | "Inactiva") => {
    return isActive === "Activa" ? "success" : "danger";
  };
  const formatCurrency = (value: number) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  const getTotalUSDTCollectedInAllRounds = () => {
    if (totalRoundsInfo.length === 0) return formatCurrency(0);
    const total = totalRoundsInfo.reduce((acc, round) => {
      return acc + (round.currentUSDTCollected ?? 0);
    }, 0);
    return formatCurrency(total);
  };

  const formatDate = (date: number) => {
    return dayjs(date).format("DD/MM/YYYY");
  };

  const footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totals:"
          colSpan={7}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={getTotalUSDTCollectedInAllRounds} />
      </Row>
    </ColumnGroup>
  );

  const handleNewRoundSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const roundNumber = formData.get("roundNumber");
    const priceGMK = formData.get("priceGMK");
    const maxGMKSelled = formData.get("maxGMKSelled");
    const amountGMKxNFT = formData.get("amountGMKxNFT");

    newRound({
      dateStartRound: dateNewRound,
      priceGMKInUSDT: Number(priceGMK),
      maxGMKSelled: Number(maxGMKSelled),
      amountGMKxNFT: Number(amountGMKxNFT),
    })
      .then((res) => {
        Swal.fire(
          "Ronda creada",
          "La ronda ha sido creada con éxito",
          "success"
        );
        // reset form
        // e.currentTarget.reset();
        getTotalRoundsInfo()
          .then((res) => {
            if (res) {
              setTotalRoundsInfo(res);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setShowModalRound(false);
      })
      .catch((err) => {
        console.log(err);
        setShowModalRound(false);
        Swal.fire("Error", "Ocurrió un error al crear la ronda", "error");
      });
  };

  return (
    <div className="px-10">
      <div className="flex  justify-between items-center">
        <h2 className="text-2xl font-bold">Total de Rondas: {totalRounds}</h2>
        <button
          className="bg-yellow-500 px-3 py-2 rounded-md shadow-lg hover:opacity-75 flex items-center gap-2"
          onClick={() => setShowModalRound(true)}
        >
          <i className="pi pi-plus"></i>
          Crear Nueva ronda
        </button>
        <Dialog
          visible={showModalRound}
          header="Nueva Ronda"
          onHide={() => setShowModalRound(false)}
          // style={{ width: "auto", maxWidth: "500px" }}
          className="w-11/12 md:w-1/2"
          headerClassName="bg-yellow-500 text-black"
          draggable={false}
          resizable={false}
        >
          <form onSubmit={handleNewRoundSubmit} className="pt-4">
            <div className="flex flex-col gap-3">
              <div>
                <label htmlFor="roundNumber">Número de ronda</label>
                <input
                  type="number"
                  name="roundNumber"
                  id="roundNumber"
                  className="w-full border border-gray-300 rounded-md p-2"
                  value={totalRounds + 1}
                  readOnly
                />
              </div>
              <div>
                <label htmlFor="roundDate">Fecha de inicio</label>
                <Calendar
                  name="roundDate"
                  id="roundDate"
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                  dateFormat="dd/mm/yy"
                  onChange={(e) =>
                    setdateNewRound(
                      e.value ? e.value.getTime() : new Date().getTime()
                    )
                  }
                />
              </div>
              <div>
                <label htmlFor="priceGMK">Precio de GMK en USD</label>
                <input
                  type="number"
                  name="priceGMK"
                  id="priceGMK"
                  className="w-full border border-gray-300 rounded-md p-2"
                  step={0.01}
                />
              </div>
              <div>
                <label htmlFor="maxGMKSelled">Máximo de GMKs a vender</label>
                <input
                  type="number"
                  name="maxGMKSelled"
                  id="maxGMKSelled"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="amountGMKxNFT">GMKs para generar NFTs</label>
                <input
                  type="number"
                  name="amountGMKxNFT"
                  id="amountGMKxNFT"
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 px-3 py-2 rounded-md shadow-lg hover:opacity-75 text-white"
              >
                Crear Ronda
              </button>
            </div>
          </form>
        </Dialog>
      </div>

      <div className="flex flex-col gap-2">
        <p>{/* Balance: <span>{Number(balanceGMK / 1e8)}GMK</span> */}</p>
        <hr />
        <DataTable
          value={totalRoundsInfo}
          tableStyle={{ minWidth: "50rem" }}
          className="p-datatable-sm"
          footerColumnGroup={footerGroup}
          scrollable
        >
          <Column field="numberofRound" header="N° de Ronda"></Column>
          <Column
            field="dateStartRound"
            header="Fecha de inicio"
            body={(round: IRound) => formatDate(round.dateStartRound)}
          ></Column>
          <Column
            field="priceGMKInUSDT"
            header="Precio GMK (USD)"
            body={(round: IRound) =>
              round.priceGMKInUSDT
                ? formatCurrency(round.priceGMKInUSDT)
                : "N/A"
            }
          ></Column>
          <Column field="amountGMKxNFT" header="GMK x NFT"></Column>
          <Column field="currentGMKSelled" header="GMK vendido"></Column>
          <Column
            field="currentUSDTCollected"
            header="USDT Recaudado"
            body={(round: IRound) =>
              round.currentUSDTCollected
                ? formatCurrency(round.currentUSDTCollected)
                : "N/A"
            }
          ></Column>
          <Column
            field="isActive"
            header="Estado"
            body={(round: IRound) => (
              <Tag
                value={
                  round.isActive && round.numberofRound > totalRounds - 1
                    ? "Activa"
                    : "Inactiva"
                }
                severity={getSeverity(
                  round.isActive && round.numberofRound > totalRounds - 1
                    ? "Activa"
                    : "Inactiva"
                )}
              ></Tag>
            )}
          ></Column>
          <Column field="maxGMKSelled" header="Max sell limit"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default RoundsPage;
