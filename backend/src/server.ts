import * as express from "express";
import * as dotenv from "dotenv";
dotenv.config();

import {translateText} from "./services/translationService";
import {detectLanguage} from "./services/languageService";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post('/detect-language', async (req, res) => {
    const {text} = req.body;

    const response = await detectLanguage(text);
    res.json({language: response.language});
})

app.post("/translate", async (req, res) => {
    const {text, sourceLang, targetLang} = req.body;

    const translation = await translateText({text, sourceLang, targetLang});
    res.json({translation});
})

app.listen(PORT, () => {
console.log(`Server running: http://localhost:${PORT}`);
});
