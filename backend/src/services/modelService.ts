import { ChatGroq } from "@langchain/groq";
import { wrapSDK } from "langsmith/wrappers";
import { z } from "zod";
import { LanguageCode } from "../types.js";

export const model = wrapSDK(
  new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    apiKey: process.env.GROQ_API_KEY,
  }),
);

const LanguageDetectionResponseFormatter = z.object({
  language: z.nativeEnum(LanguageCode),
});

export const languageDetectionModel = model.withStructuredOutput(
  LanguageDetectionResponseFormatter,
);
