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

export interface Language {
  code: LanguageCode;
  name: string;
  emoji: string;
}

export const LANGUAGES: Language[] = [
  { code: LanguageCode.English, name: "English", emoji: "🇬🇧" },
  { code: LanguageCode.Spanish, name: "Spanish", emoji: "🇪🇸" },
  { code: LanguageCode.French, name: "French", emoji: "🇫🇷" },
  { code: LanguageCode.German, name: "German", emoji: "🇩🇪" },
  { code: LanguageCode.Italian, name: "Italian", emoji: "🇮🇹" },
  { code: LanguageCode.Portuguese, name: "Portuguese", emoji: "🇵🇹" },
  { code: LanguageCode.Russian, name: "Russian", emoji: "🇷🇺" },
  { code: LanguageCode.Chinese, name: "Chinese", emoji: "🇨🇳" },
  { code: LanguageCode.Japanese, name: "Japanese", emoji: "🇯🇵" },
  { code: LanguageCode.Korean, name: "Korean", emoji: "🇰🇷" },
  { code: LanguageCode.Arabic, name: "Arabic", emoji: "🇸🇦" },
];

export const getLanguageEmoji = (code: LanguageCode) => {
  return LANGUAGES.find((lang) => lang.code === code)?.emoji || "🌐";
};

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

export interface Tone {
  id: ToneStyle;
  label: string;
  icon: string;
}

export const TONES: Tone[] = [
  { id: ToneStyle.Formal, label: "Formal", icon: "👔" },
  { id: ToneStyle.Casual, label: "Casual", icon: "👟" },
  { id: ToneStyle.Friendly, label: "Friendly", icon: "😊" },
  { id: ToneStyle.Professional, label: "Professional", icon: "💼" },
  { id: ToneStyle.Simple, label: "Simple", icon: "🔤" },
  { id: ToneStyle.Technical, label: "Technical", icon: "⚙️" },
  { id: ToneStyle.Poetic, label: "Poetic", icon: "🎭" },
  { id: ToneStyle.Humorous, label: "Humorous", icon: "😂" },
];
