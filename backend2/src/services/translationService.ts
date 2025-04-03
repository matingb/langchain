import {HumanMessage, SystemMessage} from "@langchain/core/messages";
import {getTranslateTextPrompt} from "../prompts";
import {TranslationRequest} from "../types";
import {model} from "./modelService";

export const translateText = async ({text, sourceLang, targetLang}: TranslationRequest): Promise<string> => {
    const response = await model.invoke([
        new SystemMessage(getTranslateTextPrompt(sourceLang, targetLang)),
        new HumanMessage(text),
    ]);
    return response.content.toString();
};
