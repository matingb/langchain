import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { DETECT_LANGUAGE_PROMPT } from "../prompts.js";
import { LanguageDetectionResponse } from "../types.js";
import { languageDetectionModel } from "./modelService.js";

class LanguageDetectorService {
  async detectLanguage(input: string): Promise<LanguageDetectionResponse> {
    const prompt = await DETECT_LANGUAGE_PROMPT.format({ text: input });
    const response = await languageDetectionModel.invoke([
      new SystemMessage(prompt),
      new HumanMessage(input),
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
