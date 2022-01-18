/*
  Warnings:

  - You are about to drop the column `country` on the `author` table. All the data in the column will be lost.
  - You are about to drop the column `org` on the `author` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryId` to the `conference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerId` to the `conference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countrId` to the `organization` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "author" DROP CONSTRAINT "FK_author.org";

-- AlterTable
ALTER TABLE "author" DROP COLUMN "country",
DROP COLUMN "org",
ADD COLUMN     "countryId" INTEGER NOT NULL,
ADD COLUMN     "orgId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "conference" ADD COLUMN     "countryId" INTEGER NOT NULL,
ADD COLUMN     "organizerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "countrId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "author" ADD CONSTRAINT "author_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "author" ADD CONSTRAINT "author_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conference" ADD CONSTRAINT "conference_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conference" ADD CONSTRAINT "conference_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_countrId_fkey" FOREIGN KEY ("countrId") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
