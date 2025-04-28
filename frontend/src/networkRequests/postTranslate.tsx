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
  const apiUrl = process.env.REACT_APP_API_URL;
  const response = await fetch(`${apiUrl}/translate`, {
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
