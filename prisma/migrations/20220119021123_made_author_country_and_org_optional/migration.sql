-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Author" DROP CONSTRAINT "Author_orgId_fkey";

-- AlterTable
ALTER TABLE "Author" ALTER COLUMN "countryId" DROP NOT NULL,
ALTER COLUMN "orgId" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
