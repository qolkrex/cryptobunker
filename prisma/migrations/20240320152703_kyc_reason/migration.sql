-- AlterTable
ALTER TABLE "KYC" ADD COLUMN     "badFields" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "reason" TEXT;
