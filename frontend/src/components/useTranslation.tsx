import { LanguageCode, ToneStyle } from "./types";
import { useEffect, useMemo, useState } from "react";
import throttle from "lodash/throttle";
import { postDetectLanguage } from "../networkRequests/postDetectLanguage";
import { postTranslate } from "../networkRequests/postTranslate";

export const useTranslation = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState<LanguageCode>(LanguageCode.Spanish);
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>(LanguageCode.English);
  const [selectedStyles, setSelectedStyles] = useState<ToneStyle[]>([]);

  const toggleToneStyle = (toneStyle: ToneStyle) => {
    setSelectedStyles((prevStyles) => {
      const styles = new Set(prevStyles);
      styles.has(toneStyle) ? styles.delete(toneStyle) : styles.add(toneStyle);
      return Array.from(styles);
    });
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const throttleTranslate = useMemo(
    () =>
      throttle(
        async (
          input: string,
          sourceLang: LanguageCode,
          targetLang: LanguageCode,
          selectedStyles,
        ) => {
          const detectLanguageResponse = await postDetectLanguage(input);
          const detectedLang = detectLanguageResponse.language;

          if (detectedLang !== sourceLang && detectedLang === targetLang) {
            setTargetLanguage(sourceLang);
            setSourceLanguage(detectedLang);
          } else {
            setSourceLanguage(detectedLang);
          }

          const translationResponse = await postTranslate(
            input,
            sourceLang,
            targetLang,
            selectedStyles,
          );
          setTranslatedText(translationResponse.translation);
        },
        2000,
      ),
    [],
  );

  useEffect(() => {
    if (!sourceText.trim()) return;
    throttleTranslate(sourceText, sourceLanguage, targetLanguage, selectedStyles);
  }, [sourceText, sourceLanguage, targetLanguage, throttleTranslate, selectedStyles]);

  return {
    sourceText,
    setSourceText,
    translatedText,
    sourceLanguage,
    setSourceLanguage,
    targetLanguage,
    setTargetLanguage,
    selectedStyles,
    handleStyleToggle: toggleToneStyle,
    swapLanguages,
  };
};
