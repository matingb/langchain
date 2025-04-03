export interface LanguageDetectionResponse {
    language: string;
    notes?: string | null;
}

export interface TranslationRequest {
    text: string;
    sourceLang: string;
    targetLang: string;
}
