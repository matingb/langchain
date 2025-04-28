import { LanguageCode } from "../components/types";

export type DetectLanguageResponse = {
  language: LanguageCode;
};

export const postDetectLanguage = async (input: string): Promise<DetectLanguageResponse> => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const response = await fetch(`${apiUrl}/detect-language`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input }),
  });

  return await response.json();
};
