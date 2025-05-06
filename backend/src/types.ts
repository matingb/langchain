export enum LanguageCode {
  English = "en",
  Spanish = "es",
  French = "fr",
  German = "de",
  Italian = "it",
  Portuguese = "pt",
  Russian = "ru",
  Chinese = "zh",
  Japanese = "ja",
  Korean = "ko",
  Arabic = "ar",
}

export enum ToneStyle {
  Formal = "formal",
  Casual = "casual",
  Friendly = "friendly",
  Professional = "professional",
  Simple = "simple",
  Technical = "technical",
  Poetic = "poetic",
  Humorous = "humorous",
}

export interface LanguageDetectionResponse {
  language: LanguageCode;
}
export interface TranslationRequest {
  input: string;
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  toneStyles: ToneStyle[];
}
