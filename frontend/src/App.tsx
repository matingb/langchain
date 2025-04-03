import React, {useEffect, useState} from 'react';
import './App.css';


enum Language {
    English = "en",
    Spanish = "es",
    Italian = "it",
    Unknown = "unknown"
}

function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [detectedLang, setDetectedLang] = useState<Language>(Language.Unknown);
    const [targetLang, setTargetLang] = useState<Language>(Language.English);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (!input.trim()) return;

            try {
                const response = await fetch("http://localhost:3001/detect-language", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({text: input}),
                });

                const data = await response.json();
                setDetectedLang(data.language as Language);

            } catch (error) {
                console.error("Error detecting language:", error);
                setDetectedLang(Language.Unknown);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [input]);


    const translateText = async () => {
        if (!input.trim()) return;

        setLoading(true);

        const response = await fetch("http://localhost:3001/translate", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                text: input,
                sourceLang: detectedLang,
                targetLang: targetLang,
            }),
        });

        const data = await response.json();

        setOutput(data.translation);
        setLoading(false);
    };

    return (
        <div className="container">
            <div className="column">
                <select value={detectedLang} onChange={(e) => setDetectedLang(e.target.value as Language)}>
                    {Object.entries(Language).map(([key, value]) => (
                        <option key={key} value={value}>{key}</option>
                    ))}
                </select>
                <textarea
                    className="text-box"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu texto aquí..."
                />
            </div>

            <button className="translate-button" onClick={translateText} disabled={loading}>
                {loading ? "Traduciendo..." : "Traducir"}
            </button>

            <div className="column">
                <select value={targetLang} onChange={(e) => setTargetLang(e.target.value as Language)}>
                    {Object.entries(Language).map(([key, value]) => (
                        <option key={key} value={value}>{key}</option>
                    ))}
                </select>
                <textarea
                    className="text-box"
                    value={output}
                    readOnly
                    placeholder="Traducción aparecerá aquí..."
                />
            </div>
        </div>
    );
}

export default App;
