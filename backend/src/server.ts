import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { languageDetectorService } from "./services/languageService.js";
import { translatorService } from "./services/translationService.js";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT;

app.use(express.json());

app.post("/detect-language", async (req, res) => {
  const { text } = req.body;

  const response = await languageDetectorService.detectLanguage(text);

  res.json({ language: response.language });
});

app.post("/translate", async (req, res) => {
  const { text, sourceLang, targetLang, toneStyles } = req.body;

  const translation = await translatorService.translateText({
    input: text,
    sourceLang,
    targetLang,
    toneStyles,
  });

  res.json({ translation });
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
