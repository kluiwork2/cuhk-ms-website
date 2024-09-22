/*
  Warnings:

  - You are about to drop the column `dbp` on the `TimeRecord` table. All the data in the column will be lost.
  - You are about to drop the column `endAt` on the `TimeRecord` table. All the data in the column will be lost.
  - You are about to drop the column `pulse` on the `TimeRecord` table. All the data in the column will be lost.
  - You are about to drop the column `sbp` on the `TimeRecord` table. All the data in the column will be lost.
  - Added the required column `durationInMin` to the `TimeRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeRecord" DROP COLUMN "dbp",
DROP COLUMN "endAt",
DROP COLUMN "pulse",
DROP COLUMN "sbp",
ADD COLUMN     "durationInMin" INTEGER NOT NULL;
