import {LanguageDetectionResponse} from "../types";
import {DETECT_LANGUAGE_PROMPT} from "../prompts";
import {languageDetectionModel} from "./modelService";
import {HumanMessage, SystemMessage} from "@langchain/core/messages";

export const detectLanguage = async (text: string): Promise<LanguageDetectionResponse> => {

    const prompt = await DETECT_LANGUAGE_PROMPT.format({text: text})
    const response = await languageDetectionModel.invoke([
        new SystemMessage(prompt),
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