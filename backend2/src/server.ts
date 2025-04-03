import * as express from "express";
import * as dotenv from "dotenv";
import {detectLanguage} from "./services/languageService";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// app.post("/detect-language", async (req: Request, res: Response) => {
// // try {
// //     const {text} = req.body;
// //     if (!text || text.trim() === "") {
// //         res.status(400).json({error: "Text is required"});
// //         return;
// //     }
// //
// //     const response = await detectLanguage(text);
// //     res.json({language: response.language});
// // } catch (error) {
// //     console.error("Error detecting language:", error);
// //     res.status(500).json({error: "Failed to detect language"});
// // }
// });

interface ProcesarRequestBody {
    text: string;
}

interface ProcesarResponse {
    resultado: string;
}

app.post('/procesar', async (req, res) => {
    const {text} = req.body;

    const textoProcesado = await detectLanguage(text)

    res.json({resultado: textoProcesado});
})


app.listen(PORT, () => {
console.log(`🔥 Servidor corriendo en http://localhost:${PORT}`);
});
