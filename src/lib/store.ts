import { Assessment, parseAssement, parseItem } from "../helper/Parser";
import { ZipReader } from "@zip.js/zip.js";
import { writable } from "svelte/store";
import logger from "../helper/Log";

export const file = writable<any>(undefined);
export const assessment = writable<Assessment | undefined>(undefined);

file.subscribe(async (zipPath) => {
    if (!zipPath) return

    try {
        const reader = new ZipReader(zipPath.stream());
        const entries = await reader.getEntries()
        const assessmentParsed = await parseAssement(entries);
        const assessmentWithItem = await parseItem(entries, assessmentParsed);
        assessment.set(assessmentWithItem);
        logger.log("Assessment loaded");
    }
    catch (e) {
        const err = e as Error
        logger.catch(err)
    }

})

export const reset = () => {
    file.set(undefined);
    assessment.set(undefined);
}
