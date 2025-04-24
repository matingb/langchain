import { PromptTemplate } from "@langchain/core/prompts";

export const TRANSLATE_PROMPT = PromptTemplate.fromTemplate(
  "Translate from {detectedLang} to {targetLang}. Output only the translated text. No quotes. No notes. No formatting.",
);

export const TONE_PROMPT = PromptTemplate.fromTemplate(
  "Use the following tones: {tones}. Be strict about tone.",
);

export const DETECT_LANGUAGE_PROMPT = PromptTemplate.fromTemplate(
  "Behave like a language expert system, detect the ISO 639-1 language code for the following text",
);
