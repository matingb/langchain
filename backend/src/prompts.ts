import { PromptTemplate } from "@langchain/core/prompts";

export const TRANSLATE_PROMPT = PromptTemplate.fromTemplate(
  "Translate from {detectedLang} to {targetLang}. Output only the translated text. No quotes. No notes. No formatting.",
);

export const TONE_PROMPT = PromptTemplate.fromTemplate(
  "Rewrite it using the following tone(s): {tones}. Be strict about the tone. Ensure the output feels natural in the target language and culture. Ensure the output keeps the original meaning of the input",
);

export const DETECT_LANGUAGE_PROMPT = PromptTemplate.fromTemplate(
  "Behave like a language expert system, detect the ISO 639-1 language code for the following text",
);
