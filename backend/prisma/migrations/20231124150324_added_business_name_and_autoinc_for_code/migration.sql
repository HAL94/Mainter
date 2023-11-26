/*
  Warnings:

  - The `code` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[businessName]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "clients_code_key";

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "businessName" TEXT,
DROP COLUMN "code",
ADD COLUMN     "code" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "clients_businessName_key" ON "clients"("businessName");
