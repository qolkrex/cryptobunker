/*
  Warnings:

  - The `verified` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "KYCStatus" AS ENUM ('unverified', 'pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "verified",
ADD COLUMN     "verified" "KYCStatus" NOT NULL DEFAULT 'unverified';
