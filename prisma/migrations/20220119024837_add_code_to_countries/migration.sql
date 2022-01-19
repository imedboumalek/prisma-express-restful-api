/*
  Warnings:

  - Added the required column `code` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "code" VARCHAR(2) NOT NULL;
