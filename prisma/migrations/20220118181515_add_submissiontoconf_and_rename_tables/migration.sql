/*
  Warnings:

  - You are about to drop the `author` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `conference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `submission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `submissionTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `topic` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubmissionAuthors" DROP CONSTRAINT "SubmissionAuthors_authorId_fkey";

-- DropForeignKey
ALTER TABLE "SubmissionAuthors" DROP CONSTRAINT "SubmissionAuthors_submissionId_fkey";

-- DropForeignKey
ALTER TABLE "author" DROP CONSTRAINT "author_countryId_fkey";

-- DropForeignKey
ALTER TABLE "author" DROP CONSTRAINT "author_orgId_fkey";

-- DropForeignKey
ALTER TABLE "conference" DROP CONSTRAINT "conference_countryId_fkey";

-- DropForeignKey
ALTER TABLE "conference" DROP CONSTRAINT "conference_organizerId_fkey";

-- DropForeignKey
ALTER TABLE "conference" DROP CONSTRAINT "conference_topicId_fkey";

-- DropForeignKey
ALTER TABLE "organization" DROP CONSTRAINT "organization_countryId_fkey";

-- DropForeignKey
ALTER TABLE "submission" DROP CONSTRAINT "submission_topicId_fkey";

-- DropForeignKey
ALTER TABLE "submissionTags" DROP CONSTRAINT "submissionTags_postId_fkey";

-- DropForeignKey
ALTER TABLE "submissionTags" DROP CONSTRAINT "submissionTags_tagId_fkey";

-- DropTable
DROP TABLE "author";

-- DropTable
DROP TABLE "conference";

-- DropTable
DROP TABLE "country";

-- DropTable
DROP TABLE "organization";

-- DropTable
DROP TABLE "submission";

-- DropTable
DROP TABLE "submissionTags";

-- DropTable
DROP TABLE "tag";

-- DropTable
DROP TABLE "topic";

-- CreateTable
CREATE TABLE "Author" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "salt" VARCHAR(60) NOT NULL,
    "jwt" VARCHAR(320) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL DEFAULT E'',
    "last_name" VARCHAR(50) NOT NULL DEFAULT E'',
    "countryId" INTEGER NOT NULL,
    "orgId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conference" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "date" TIMESTAMP(6),
    "sub_limit_date" TIMESTAMP(6),
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "topicId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "organizerId" INTEGER NOT NULL,

    CONSTRAINT "Conference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "submission_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(256),
    "resume" TEXT,
    "url" VARCHAR(512),
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConferenceSubmissions" (
    "submissionId" INTEGER NOT NULL,
    "conferenceId" INTEGER NOT NULL,

    CONSTRAINT "ConferenceSubmissions_pkey" PRIMARY KEY ("submissionId","conferenceId")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL DEFAULT E'',

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionTags" (
    "tagId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "SubmissionTags_pkey" PRIMARY KEY ("tagId","postId")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL DEFAULT E'',

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Author_username_key" ON "Author"("username");

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Author" ADD CONSTRAINT "Author_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conference" ADD CONSTRAINT "Conference_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionAuthors" ADD CONSTRAINT "SubmissionAuthors_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionAuthors" ADD CONSTRAINT "SubmissionAuthors_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConferenceSubmissions" ADD CONSTRAINT "ConferenceSubmissions_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConferenceSubmissions" ADD CONSTRAINT "ConferenceSubmissions_conferenceId_fkey" FOREIGN KEY ("conferenceId") REFERENCES "Conference"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionTags" ADD CONSTRAINT "SubmissionTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionTags" ADD CONSTRAINT "SubmissionTags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Submission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
