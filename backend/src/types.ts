export enum Language {
  ES = "es",
  EN = "en",
  IT = "it",
}

export interface LanguageDetectionResponse {
  language: Language;
  notes?: string | null;
}
export interface TranslationRequest {
  text: string;
  sourceLang: string;
  targetLang: string;
  toneStyles: string[];
}
