import { writable } from "svelte/store";
import { assessmentSchema } from "./db/schema";
import db from "./db";

export const databaseLoaded = writable(false);
export const migrated = writable(false);
export const errors = writable<InternalError[]>([]);

export const assessment = writable<(typeof assessmentSchema.$inferSelect)[]>([]);

export const refreshAssessment = async () => {
  const data = await db.select().from(assessmentSchema).execute()
  assessment.update(() => data);
}

migrated.subscribe(async (loaded) => {
  if (loaded) {
    await refreshAssessment();
  }
})