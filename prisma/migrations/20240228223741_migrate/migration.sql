-- CreateTable
CREATE TABLE "AddressAndPrivateKey" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AddressAndPrivateKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AddressAndPrivateKey_address_key" ON "AddressAndPrivateKey"("address");

-- AddForeignKey
ALTER TABLE "AddressAndPrivateKey" ADD CONSTRAINT "AddressAndPrivateKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
