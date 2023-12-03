/*
  Warnings:

  - You are about to drop the `ClientVehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientVehicle" DROP CONSTRAINT "ClientVehicle_appId_fkey";

-- DropForeignKey
ALTER TABLE "ClientVehicle" DROP CONSTRAINT "ClientVehicle_ownerId_fkey";

-- DropTable
DROP TABLE "ClientVehicle";

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "appId" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_appId_fkey" FOREIGN KEY ("appId") REFERENCES "App"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
