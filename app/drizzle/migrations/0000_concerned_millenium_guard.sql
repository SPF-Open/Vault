CREATE TABLE "assessment" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	CONSTRAINT "assessment_title_unique" UNIQUE("title")
);
