CREATE TYPE "public"."lang" AS ENUM('FR', 'NL', 'DE');--> statement-breakpoint
CREATE TYPE "public"."level" AS ENUM('D1', 'C1', 'B1', 'A1', 'A2', 'A3', 'A4', 'A5');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('MCQ', 'OQ', 'BOTH');--> statement-breakpoint
CREATE TABLE "multiple_choice_question" (
	"id" serial PRIMARY KEY NOT NULL,
	"links" serial NOT NULL,
	"title" text NOT NULL,
	"prompt" text NOT NULL,
	"lang" "lang",
	"assessment_id" serial NOT NULL,
	"competance_id" serial NOT NULL,
	"dimension_id" serial NOT NULL,
	"indicator_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "open_question" (
	"id" serial PRIMARY KEY NOT NULL,
	"links" serial NOT NULL,
	"title" text NOT NULL,
	"prompt" text NOT NULL,
	"answer" text NOT NULL,
	"lang" "lang",
	"assessment_id" serial NOT NULL,
	"competance_id" serial NOT NULL,
	"dimension_id" serial NOT NULL,
	"indicator_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "alternative" (
	"id" serial PRIMARY KEY NOT NULL,
	"links" serial NOT NULL,
	"title" text NOT NULL,
	"correct" text NOT NULL,
	"lang" "lang",
	"mcq_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "competance" (
	"id" serial PRIMARY KEY NOT NULL,
	"links" serial NOT NULL,
	"title" text NOT NULL,
	"lang" "lang",
	"assessment_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dimension" (
	"id" serial PRIMARY KEY NOT NULL,
	"links" serial NOT NULL,
	"title" text NOT NULL,
	"lang" "lang",
	"assessment_id" serial NOT NULL,
	"competance_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "indicator" (
	"id" serial PRIMARY KEY NOT NULL,
	"links" serial NOT NULL,
	"title" text NOT NULL,
	"lang" "lang",
	"assessment_id" serial NOT NULL,
	"competance_id" serial NOT NULL,
	"dimension_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE "version" (
	"id" serial PRIMARY KEY NOT NULL,
	"version" text NOT NULL,
	"date" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "assessment" ADD COLUMN "links" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "assessment" ADD COLUMN "selection" text NOT NULL;--> statement-breakpoint
ALTER TABLE "assessment" ADD COLUMN "level" "level";--> statement-breakpoint
ALTER TABLE "assessment" ADD COLUMN "lang" "lang";--> statement-breakpoint
ALTER TABLE "assessment" ADD COLUMN "type" "type";--> statement-breakpoint
ALTER TABLE "multiple_choice_question" ADD CONSTRAINT "multiple_choice_question_assessment_id_assessment_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "multiple_choice_question" ADD CONSTRAINT "multiple_choice_question_competance_id_competance_id_fk" FOREIGN KEY ("competance_id") REFERENCES "public"."competance"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "multiple_choice_question" ADD CONSTRAINT "multiple_choice_question_dimension_id_dimension_id_fk" FOREIGN KEY ("dimension_id") REFERENCES "public"."dimension"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "multiple_choice_question" ADD CONSTRAINT "multiple_choice_question_indicator_id_indicator_id_fk" FOREIGN KEY ("indicator_id") REFERENCES "public"."indicator"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "open_question" ADD CONSTRAINT "open_question_assessment_id_assessment_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "open_question" ADD CONSTRAINT "open_question_competance_id_competance_id_fk" FOREIGN KEY ("competance_id") REFERENCES "public"."competance"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "open_question" ADD CONSTRAINT "open_question_dimension_id_dimension_id_fk" FOREIGN KEY ("dimension_id") REFERENCES "public"."dimension"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "open_question" ADD CONSTRAINT "open_question_indicator_id_indicator_id_fk" FOREIGN KEY ("indicator_id") REFERENCES "public"."indicator"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alternative" ADD CONSTRAINT "alternative_mcq_id_multiple_choice_question_id_fk" FOREIGN KEY ("mcq_id") REFERENCES "public"."multiple_choice_question"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "competance" ADD CONSTRAINT "competance_assessment_id_assessment_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dimension" ADD CONSTRAINT "dimension_assessment_id_assessment_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "dimension" ADD CONSTRAINT "dimension_competance_id_competance_id_fk" FOREIGN KEY ("competance_id") REFERENCES "public"."competance"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "indicator" ADD CONSTRAINT "indicator_assessment_id_assessment_id_fk" FOREIGN KEY ("assessment_id") REFERENCES "public"."assessment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "indicator" ADD CONSTRAINT "indicator_competance_id_competance_id_fk" FOREIGN KEY ("competance_id") REFERENCES "public"."competance"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "indicator" ADD CONSTRAINT "indicator_dimension_id_dimension_id_fk" FOREIGN KEY ("dimension_id") REFERENCES "public"."dimension"("id") ON DELETE no action ON UPDATE no action;