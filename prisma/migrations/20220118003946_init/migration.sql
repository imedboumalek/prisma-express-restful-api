-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password" VARCHAR(60) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL DEFAULT E'',
    "last_name" VARCHAR(50) NOT NULL DEFAULT E'',
    "country" INTEGER,
    "org" INTEGER,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conference" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "date" TIMESTAMP(6),
    "sub_limit_date" TIMESTAMP(6),

    CONSTRAINT "conference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submission" (
    "id" SERIAL NOT NULL,
    "submission_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authors" INTEGER[],
    "title" VARCHAR(256),
    "resume" TEXT,
    "url" VARCHAR(512),
    "tags" INTEGER[],
    "conferences" INTEGER[],

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL DEFAULT E'',

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "topic" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(128) NOT NULL DEFAULT E'',

    CONSTRAINT "topic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "author_email_key" ON "author"("email");

-- CreateIndex
CREATE UNIQUE INDEX "author_username_key" ON "author"("username");

-- AddForeignKey
ALTER TABLE "author" ADD CONSTRAINT "FK_author.org" FOREIGN KEY ("org") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
