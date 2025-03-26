import {z} from "zod";

export const LanguageDetectionResponseFormatter = z.object({
    language: z.string(),
    notes: z.string().nullish(),
});

export interface TranslationRequest {
    text: string;
    sourceLang: string;
    targetLang: string;
}
