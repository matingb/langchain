import {HumanMessage, SystemMessage} from "@langchain/core/messages";
import {TranslationRequest} from "../types";
import {model} from "./modelService";
import {TRANSLATE_PROMPT} from "../prompts.js";

export const translateText = async ({text, sourceLang, targetLang}: TranslationRequest): Promise<string> => {

    const prompt = await TRANSLATE_PROMPT.format({detectedLang: sourceLang, targetLang: targetLang})
    const response = await model.invoke([
        new SystemMessage(prompt),
        new HumanMessage(text),
    ]);

    return response.content.toString();
};
