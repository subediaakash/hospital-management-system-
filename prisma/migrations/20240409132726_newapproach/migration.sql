/*
  Warnings:

  - You are about to drop the column `role` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "role";
