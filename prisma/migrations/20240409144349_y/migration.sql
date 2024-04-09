/*
  Warnings:

  - Added the required column `role` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Made the column `specialtyId` on table `Doctor` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `role` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_specialtyId_fkey";

-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "specialtyId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "role" "Role" NOT NULL;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
