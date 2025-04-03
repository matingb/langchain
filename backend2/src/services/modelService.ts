import { ChatGroq } from "@langchain/groq";
import { wrapSDK } from "langsmith/wrappers";

export const model = wrapSDK(
    new ChatGroq({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        apiKey: process.env.GROQ_API_KEY!,
    })
);