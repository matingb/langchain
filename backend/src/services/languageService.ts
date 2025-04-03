import {LanguageDetectionResponse} from "../types";
import {HumanMessage, SystemMessage} from "@langchain/core/messages";
import {DETECT_LANGUAGE_PROMPT} from "../prompts";
import {model} from "./modelService";
import {z} from "zod";

const LanguageDetectionResponseFormatter = z.object({
    language: z.string().min(1, "Language is required"),
    notes: z.string().nullish(),
});

const languageDetectionModel = model.withStructuredOutput(LanguageDetectionResponseFormatter);

export const detectLanguage = async (text: string): Promise<LanguageDetectionResponse> => {

    const response = await languageDetectionModel.invoke([
        new SystemMessage(DETECT_LANGUAGE_PROMPT),
        new HumanMessage(text),
    ]);

    if (!response.language) {
        throw new Error("Language detection failed: missing language field");
    }

    return {
        language: response.language,
        notes: response.notes ?? null,
    };
};