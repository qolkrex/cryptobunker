"use client";
import { getTransactions } from "@/server/actions/history/history-action";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";

interface IHistoryTransaction {
  id: string;
  transactionHash: string;
  amount: number;
  date: Date;
}

const HistoryPage = () => {
  const { data: userSession } = useSession();
  const [historyTransaction, setHistoryTransaction] = useState<
    IHistoryTransaction[]
  >([]);
  console.log(historyTransaction);

  useEffect(() => {
    if (userSession?.user) {
      getTransactions(userSession?.user?.id).then((transactions) => {
        if (transactions) {
          console.log(transactions);
          setHistoryTransaction(
            transactions.map((transaction) => {
              return {
                id: transaction.id,
                transactionHash: transaction.transactionHash,
                amount: Number(transaction.value) / 1e8,
                date: transaction.createdAt,
              };
            })
          );
        }
      });
    }

    return () => {};
  }, [userSession]);

  const formatDate = (date: Date) => {
    return dayjs(date).format("DD/MM/YYYY");
  };

  const transactionLink = (transactionHash: string) => {
    return (
      <a
        href={`https://testnet.bscscan.com/tx/${transactionHash}`}
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        {transactionHash} <i className="pi pi-external-link"></i>
      </a>
    );
  };

  return (
    <div className="px-8 flex flex-col gap-5">
      <h2 className="text-2xl">Historial de Transacciones</h2>
      <DataTable scrollable value={historyTransaction}>
        <Column
          header="#"
          headerStyle={{ width: "3rem" }}
          body={(data, options) => options.rowIndex + 1}
        ></Column>
        <Column
          field="transactionHash"
          header="Hash"
          body={(history) => transactionLink(history.transactionHash)}
        />
        <Column
          field="amount"
          header="Monto"
          body={(history) => <p>{history.amount} GMK's</p>}
        />
        <Column
          field="date"
          header="Fecha"
          body={(history) => formatDate(history.date)}
          sortable
        />
      </DataTable>
    </div>
  );
};

export default HistoryPage;
