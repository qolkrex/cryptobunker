/*
  Warnings:

  - You are about to drop the column `documentImage` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[documentNumber]` on the table `KYC` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "KYC" ADD COLUMN     "address" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "documentNumber" TEXT,
ALTER COLUMN "documentType" DROP NOT NULL,
ALTER COLUMN "documentFrontUrl" DROP NOT NULL,
ALTER COLUMN "documentBackUrl" DROP NOT NULL,
ALTER COLUMN "verificationStatus" DROP NOT NULL,
ALTER COLUMN "verificationStatus" SET DEFAULT 'unverified',
ALTER COLUMN "verificationDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "documentImage",
ADD COLUMN     "documentImageBack" TEXT,
ADD COLUMN     "documentImageFront" TEXT,
ADD COLUMN     "documentNumber" TEXT,
ADD COLUMN     "documentType" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "KYC_documentNumber_key" ON "KYC"("documentNumber");
