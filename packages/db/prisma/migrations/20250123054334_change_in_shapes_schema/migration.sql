/*
  Warnings:

  - You are about to drop the column `message` on the `Shapes` table. All the data in the column will be lost.
  - Added the required column `shape` to the `Shapes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shapes" DROP COLUMN "message",
ADD COLUMN     "shape" TEXT NOT NULL;
