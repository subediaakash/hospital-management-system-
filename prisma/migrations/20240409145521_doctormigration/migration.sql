-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_specialtyId_fkey";

-- AlterTable
ALTER TABLE "Doctor" ALTER COLUMN "specialtyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE SET NULL ON UPDATE CASCADE;
