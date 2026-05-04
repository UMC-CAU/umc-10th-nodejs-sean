/*
  Warnings:

  - You are about to drop the column `deadline` on the `mission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `mission` DROP COLUMN `deadline`,
    MODIFY `start_date` DATETIME(0) NOT NULL,
    MODIFY `end_date` DATETIME(0) NOT NULL;
