import { date, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";

export const version = pgTable("version", {
  id: serial("id").primaryKey(),
  version: text("version").notNull(),
  date: date("date").notNull().defaultNow(),
});

export const levelEnum = pgEnum('level', ['D1', 'C1', 'B1', 'A1', 'A2', 'A3', 'A4', 'A5']);
export const langEnum = pgEnum('lang', ['FR', 'NL', 'DE'])
export const typeEnum = pgEnum('type', ['MCQ', 'OQ', 'BOTH'])

export const assessmentSchema = pgTable("assessment", {
  id: serial("id").primaryKey(),
  links: serial("links"),

  title: text("title").unique().notNull(),
  selection: text("selection").notNull(),
  
  level: levelEnum(),
  lang: langEnum(),
  type: typeEnum(),
});

export const competanceSchema = pgTable("competance", {
  id: serial("id").primaryKey(),
  links: serial("links").notNull(),

  title: text("title").notNull(),
  lang: langEnum(),

  assessmentId: serial("assessment_id").references(() => assessmentSchema.id),
});

export const dimensionSchema = pgTable("dimension", {
  id: serial("id").primaryKey(),
  links: serial("links").notNull(),

  title: text("title").notNull(),
  lang: langEnum(),

  assessmentId: serial("assessment_id").references(() => assessmentSchema.id),
  competanceId: serial("competance_id").references(() => competanceSchema.id),
});

export const indicatorSchema = pgTable("indicator", {
  id: serial("id").primaryKey(),
  links: serial("links").notNull(),

  title: text("title").notNull(),

  lang: langEnum(),

  assessmentId: serial("assessment_id").references(() => assessmentSchema.id),
  competanceId: serial("competance_id").references(() => competanceSchema.id),
  dimensionId: serial("dimension_id").references(() => dimensionSchema.id),
});

export const OQSchema = pgTable("open_question", {
  id: serial("id").primaryKey(),
  links: serial("links").notNull(),

  title: text("title").notNull(),
  prompt: text("prompt").notNull(),
  answer: text("answer").notNull(),
  
  lang: langEnum(),

  assessmentId: serial("assessment_id").references(() => assessmentSchema.id),
  competanceId: serial("competance_id").references(() => competanceSchema.id),
  dimensionId: serial("dimension_id").references(() => dimensionSchema.id),
  indicatorId: serial("indicator_id").references(() => indicatorSchema.id),
});

export const MCQSchema = pgTable("multiple_choice_question", {
  id: serial("id").primaryKey(),
  links: serial("links").notNull(),

  title: text("title").notNull(),
  prompt: text("prompt").notNull(),
  
  lang: langEnum(),

  assessmentId: serial("assessment_id").references(() => assessmentSchema.id),
  competanceId: serial("competance_id").references(() => competanceSchema.id),
  dimensionId: serial("dimension_id").references(() => dimensionSchema.id),
  indicatorId: serial("indicator_id").references(() => indicatorSchema.id),
});

export const alternativeSchema = pgTable("alternative", {
  id: serial("id").primaryKey(),
  links: serial("links").notNull(),

  title: text("title").notNull(),
  correct: text("correct").notNull(),
  
  lang: langEnum(),

  MCQId: serial("mcq_id").references(() => MCQSchema.id),
});