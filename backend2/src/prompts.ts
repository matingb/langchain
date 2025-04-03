export const getTranslateTextPrompt = (detectedLang: string, targetLang: String) =>
    `Translate the following text from ${detectedLang} to ${targetLang}.  
    Respond strictly with the translated text only, without quotes, explanations, clarifications, or additional formatting.  
    Do not include source or target language information. Return only the translated text as plain content.`

export const DETECT_LANGUAGE_PROMPT = "" +
    "Behave like a language expert system, detect the language and follow the following instructions: " +
    "1. return a JSON object with a two keys:" +
    "1.1 'language': contains ONLY a 2 characters ISO 639-1 language code for the corresponding language. Dont add any other information" +
    "1.2 'notes': with any additional information."


// MEJORAS
// prompt = ChatPromptTemplate.from_messages(
//     [
//         (
//             "system",
//             "You are a helpful assistant that translates {input_language} to {output_language}.",
//         ),
//         ("human", "{input}"),
//     ]
// )