/*
  Warnings:

  - You are about to drop the `ConferenceSubmissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubmissionAuthors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubmissionTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ConferenceSubmissions" DROP CONSTRAINT "ConferenceSubmissions_conferenceId_fkey";

-- DropForeignKey
ALTER TABLE "ConferenceSubmissions" DROP CONSTRAINT "ConferenceSubmissions_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "SubmissionAuthors" DROP CONSTRAINT "SubmissionAuthors_authorId_fkey";

-- DropForeignKey
ALTER TABLE "SubmissionAuthors" DROP CONSTRAINT "SubmissionAuthors_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "SubmissionTags" DROP CONSTRAINT "SubmissionTags_postId_fkey";

-- DropForeignKey
ALTER TABLE "SubmissionTags" DROP CONSTRAINT "SubmissionTags_tagId_fkey";

-- DropTable
DROP TABLE "ConferenceSubmissions";

-- DropTable
DROP TABLE "SubmissionAuthors";

-- DropTable
DROP TABLE "SubmissionTags";

-- CreateTable
CREATE TABLE "_AuthorToSubmission" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ConferenceToSubmission" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SubmissionToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorToSubmission_AB_unique" ON "_AuthorToSubmission"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorToSubmission_B_index" ON "_AuthorToSubmission"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConferenceToSubmission_AB_unique" ON "_ConferenceToSubmission"("A", "B");

-- CreateIndex
CREATE INDEX "_ConferenceToSubmission_B_index" ON "_ConferenceToSubmission"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SubmissionToTag_AB_unique" ON "_SubmissionToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_SubmissionToTag_B_index" ON "_SubmissionToTag"("B");

-- AddForeignKey
ALTER TABLE "_AuthorToSubmission" ADD FOREIGN KEY ("A") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorToSubmission" ADD FOREIGN KEY ("B") REFERENCES "Submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConferenceToSubmission" ADD FOREIGN KEY ("A") REFERENCES "Conference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConferenceToSubmission" ADD FOREIGN KEY ("B") REFERENCES "Submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubmissionToTag" ADD FOREIGN KEY ("A") REFERENCES "Submission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubmissionToTag" ADD FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
