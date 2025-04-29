/*
  Warnings:

  - You are about to drop the column `addressId` on the `Client` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_addressId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "clientId" TEXT;

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "addressId";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
