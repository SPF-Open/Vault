import { writable } from "svelte/store";

export const databaseLoaded = writable(false);
export const migrated = writable(false);
export const errors = writable<InternalError[]>([]);