import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { TranslationRequest } from "../types.js";
import { TONE_PROMPT, TRANSLATE_PROMPT } from "../prompts.js";
import { model } from "./modelService.js";

class TranslatorService {
  async translateText({
    text,
    sourceLang,
    targetLang,
    toneStyles,
  }: TranslationRequest): Promise<string> {
    let translatePrompt = await TRANSLATE_PROMPT.format({ detectedLang: sourceLang, targetLang });

    if (toneStyles.length > 0) {
      const toneInstruction = await TONE_PROMPT.format({ tones: toneStyles.join(" - ") });
      translatePrompt += ` ${toneInstruction}`;
    }

    const response = await model.invoke([
      new SystemMessage(translatePrompt),
      new HumanMessage(text),
    ]);

    return response.content.toString();
  }
}

export const translatorService = new TranslatorService();
