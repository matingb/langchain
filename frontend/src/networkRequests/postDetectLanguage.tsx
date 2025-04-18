import {Language} from "../types";

export type DetectLanguageResponse = {
    language: Language;
};

export const postDetectLanguage = async (input: string): Promise<DetectLanguageResponse> => {
    const response = await fetch("http://localhost:3001/detect-language", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({text: input}),
    });

    return await response.json();
}