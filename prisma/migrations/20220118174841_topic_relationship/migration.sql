/*
  Warnings:

  - Added the required column `topicId` to the `conference` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topicId` to the `submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "conference" ADD COLUMN     "topicId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "submission" ADD COLUMN     "topicId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "conference" ADD CONSTRAINT "conference_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
