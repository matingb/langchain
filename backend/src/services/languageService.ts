import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { DETECT_LANGUAGE_PROMPT } from "../prompts.js";
import { LanguageDetectionResponse } from "../types.js";
import { languageDetectionModel } from "./modelService.js";

class LanguageDetectorService {
  async detectLanguage(text: string): Promise<LanguageDetectionResponse> {
    const prompt = await DETECT_LANGUAGE_PROMPT.format({ text });
    const response = await languageDetectionModel.invoke([
      new SystemMessage(prompt),
      new HumanMessage(text),
    ]);

    if (!response.language) {
      throw new Error("Language detection failed: missing language field");
    }

    return {
      language: response.language,
    };
  }
}

export const languageDetectorService = new LanguageDetectorService();
