import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import {Language} from "./types";
import {postTranslate} from "./networkRequests/postTranslate";
import throttle from "lodash/throttle";
import {postDetectLanguage} from "./networkRequests/postDetectLanguage";
import Grid from '@mui/material/Grid';

function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [sourceLang, setSourceLang] = useState<Language>(Language.Unknown);
    const [targetLang, setTargetLang] = useState<Language>(Language.English);

    const throttleDetectLanguage = useMemo(
        () =>
            throttle(async (input: string, sourceLang: Language, targetLang: Language) => {
                const detectLanguageResponse = await postDetectLanguage(input)
                const detectedLang = detectLanguageResponse.language as Language;

                if (detectedLang !== sourceLang && detectedLang === targetLang) {
                    setTargetLang(sourceLang)
                    setSourceLang(detectedLang)
                } else {
                    setSourceLang(detectedLang);
                }

                const translationResponse = await postTranslate(input, sourceLang, targetLang)
                setOutput(translationResponse.translation)
            }, 2000),
        []
    );

    useEffect(() => {
        throttleDetectLanguage(input, sourceLang, targetLang)
    }, [input, sourceLang, targetLang, throttleDetectLanguage]);

    return (
        <Grid className="container">
            <Grid className="column">
                <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value as Language)}>
                    {Object.entries(Language).map(([key, value]) => (
                        <option key={key} value={value}>{key}</option>
                    ))}
                </select>
                <textarea
                    className="text-box"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </Grid>

            <Grid className="column">
                <select value={targetLang} onChange={(e) => setTargetLang(e.target.value as Language)}>
                    {Object.entries(Language).map(([key, value]) => (
                        <option key={key} value={value}>{key}</option>
                    ))}
                </select>
                <textarea
                    className="text-box"
                    value={output}
                    readOnly
                />
            </Grid>
        </Grid>
    );
}

export default App;
