/*
  Warnings:

  - Changed the type of `type` on the `clients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('INDIVIDUAL', 'BUSINESS');

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "type",
ADD COLUMN     "type" "ClientType" NOT NULL;
