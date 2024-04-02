"use server";

import prisma from "@/lib/prisma/prisma";


/*
model Transaction {
  id                String     @id @default(uuid())
  transactionHash   String     @unique
  blockHash         String
  blockNumber       BigInt
  transactionIndex  BigInt
  from              String
  to                String
  value             BigInt
  gasUsed           BigInt
  effectiveGasPrice BigInt
  status            BigInt
  createdAt         DateTime   @default(now())

  user              User       @relation(fields: [from], references: [id])
}

*/

export interface ITransaction {
  id: string;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  transactionIndex: number;
  from: string;
  to: string;
  value: number;
  gasUsed: number;
  effectiveGasPrice: number;
  status: number;
  createdAt: Date;
}

export const createTransaction = async (transaction: ITransaction) => {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        transactionHash: transaction.transactionHash,
        blockHash: transaction.blockHash,
        blockNumber: transaction.blockNumber,
        transactionIndex: transaction.transactionIndex,
        from: transaction.from,
        to: transaction.to,
        value: transaction.value,
        gasUsed: transaction.gasUsed,
        effectiveGasPrice: transaction.effectiveGasPrice,
        status: transaction.status,
        createdAt: transaction.createdAt,
      },
    });
    return newTransaction;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getTransactions = async (id: string) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        from: id,
      },
    });

    return transactions;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTransaction = async (id: string) => {
  try {
    const transaction = await prisma.transaction.findUnique({
      where: {
        id: id,
      },
    });

    return transaction;
  } catch (error) {
    console.log(error);
    return null;
  }
};