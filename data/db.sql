CREATE TABLE "submission" (
  "id" int,
  "submission_date" timestamp,
  "authors" int[],
  "title" varchar(256),
  "resume" text,
  "url" varchar(512),
  "tags" int[5],
  "conferences" int[],
  PRIMARY KEY ("id")
);

CREATE TABLE "tag" (
  "id" int,
  "title" varchar(50),
  PRIMARY KEY ("id")
);

CREATE TABLE "organization" (
  "id" int,
  "name" varchar(128),
  PRIMARY KEY ("id")
);

CREATE TABLE "country" (
  "id" int,
  "name" varchar(128),
  PRIMARY KEY ("id")
);

CREATE TABLE "author" (
  "id" int,
  "username" varchar(50) UNIQUE,
  "first_name" varchar(50),
  "last_name" varchar(50),
  "email" varchar(320) UNIQUE,
  "country" int,
  "org" int,
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_author.org"
    FOREIGN KEY ("org")
      REFERENCES "organization"("id"),
  CONSTRAINT "FK_author.country"
    FOREIGN KEY ("country")
      REFERENCES "country"("id")
);

CREATE TABLE "topic" (
  "id" int,
  "name" varchar(128),
  PRIMARY KEY ("id")
);

CREATE TABLE "conference" (
  "id" int,
  "name" varchar(128),
  "date" timestamp,
  "sub_limit_date" timestamp,
  "country" int,
  "topics" int[],
  PRIMARY KEY ("id"),
  CONSTRAINT "FK_conference.country"
    FOREIGN KEY ("country")
      REFERENCES "country"("id")
);

