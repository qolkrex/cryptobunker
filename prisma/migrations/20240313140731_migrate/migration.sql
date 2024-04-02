/*
  Warnings:

  - You are about to drop the column `passwordHashPrivateKey` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "KYC" ADD COLUMN     "passwordHashPrivateKey" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordHashPrivateKey";
