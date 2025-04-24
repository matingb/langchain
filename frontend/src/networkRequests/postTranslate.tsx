import { LanguageCode } from "../components/types";

export type TranslationResponse = {
  translation: string;
};

export const postTranslate = async (
  input: string,
  sourceLang: LanguageCode,
  targetLang: LanguageCode,
  toneStyles: string[],
): Promise<TranslationResponse> => {
  const response = await fetch("http://localhost:3001/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: input,
      sourceLang: sourceLang,
      targetLang: targetLang,
      toneStyles: toneStyles,
    }),
  });

  return await response.json();
};
