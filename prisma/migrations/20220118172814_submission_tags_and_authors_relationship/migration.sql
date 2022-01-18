/*
  Warnings:

  - You are about to drop the column `countrId` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `authors` on the `submission` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `submission` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "organization" DROP CONSTRAINT "organization_countrId_fkey";

-- AlterTable
ALTER TABLE "organization" DROP COLUMN "countrId",
ADD COLUMN     "countryId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "submission" DROP COLUMN "authors",
DROP COLUMN "tags",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "SubmissionAuthors" (
    "authorId" INTEGER NOT NULL,
    "submissionId" INTEGER NOT NULL,

    CONSTRAINT "SubmissionAuthors_pkey" PRIMARY KEY ("authorId","submissionId")
);

-- CreateTable
CREATE TABLE "submissionTags" (
    "tagId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "submissionTags_pkey" PRIMARY KEY ("tagId","postId")
);

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionAuthors" ADD CONSTRAINT "SubmissionAuthors_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionAuthors" ADD CONSTRAINT "SubmissionAuthors_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissionTags" ADD CONSTRAINT "submissionTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submissionTags" ADD CONSTRAINT "submissionTags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
