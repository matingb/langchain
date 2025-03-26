import {DETECT_LANGUAGE_PROMPT, getTranslateTextPrompt} from "./prompts";
import {LanguageDetectionResponseFormatter} from "./types";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {ChatGroq} = require("@langchain/groq");
const {HumanMessage, SystemMessage} = require("@langchain/core/messages");
const {wrapSDK} = require("langsmith/wrappers");

const app = express();
app.use(express.json());
app.use(cors());

const model = wrapSDK(
    new ChatGroq({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        apiKey: process.env.GROQ_API_KEY,
    })
);


const languageDetectionModel = model.withStructuredOutput(LanguageDetectionResponseFormatter);

app.post("/detect-language", async (req, res) => {
    try {
        const {text} = req.body;
        if (!text || text.trim() === "") return res.status(400).json({error: "Text is required"});

        const response = await languageDetectionModel.invoke([
            new SystemMessage(DETECT_LANGUAGE_PROMPT),
            new HumanMessage(text),
        ]);

        res.json({language: response.language});
    } catch (error) {
        console.error("Error detecting language:", error);
        res.status(500).json({error: "Failed to detect language"});
    }
});

app.post("/translate", async (req, res) => {
    try {
        const {text, sourceLang, targetLang} = req.body;
        if (!text || !sourceLang || !targetLang) {
            return res.status(400).json({error: "Text, sourceLang, and targetLang are required"});
        }

        const response = await model.invoke([
            new SystemMessage(getTranslateTextPrompt(sourceLang, targetLang)),
            new HumanMessage(text),
        ]);

        res.json({translation: response.content});
    } catch (error) {
        console.error("Error translating text:", error);
        res.status(500).json({error: "Failed to translate text"});
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


