import {Client, Example, Run} from "langsmith";
import dotenv from "dotenv";
import {detectLanguage} from "../languageService.ts";
import {evaluate, EvaluationResult} from "langsmith/evaluation";

dotenv.config();

const client = new Client({apiKey: process.env.LANGSMITH_API_KEY});
const DATASET_NAME = "Language Detection";

async function createDataset(datasetName) {
    console.log(`Dataset "${datasetName}" does not exists.`);
    console.log(`Creating "${datasetName}"`);

    const dataset = await client.createDataset(datasetName);

    const examplesTest: [string, string][] = [
        ["Esta es un lindo dia", "es"],
        ["This is a wonderful day", "en"],
        ["questa è una bellissima giornata", "it"],
    ];

    const inputs = examplesTest.map(([inputPrompt, _]) => ({question: inputPrompt}));
    const outputs = examplesTest.map(([, outputAnswer]) => ({answer: outputAnswer}));
    await client.createExamples({
        inputs,
        outputs,
        datasetId: dataset.id,
    });
}

async function evaluateDataset(datasetName: string) {
    console.log(`Evaluating dataset "${datasetName}"`);
    await evaluate(
        async (exampleInput: { question: string }) => {
            const response = await detectLanguage(exampleInput.question);

            return {
                answer: response.language
            };
        }, {
            data: DATASET_NAME,
            evaluators: [isEqual],
            experimentPrefix: "Language detection experiment",
        });
}

function isEqual(rootRun: Run, example?: Example): EvaluationResult {
    const score = rootRun.outputs?.answer.toString() === example?.outputs?.answer.toString();
    return {key: "string-match", score: score};
}

async function main() {
    const isDatasetCreated = await client.hasDataset({datasetName: DATASET_NAME});
    if(!isDatasetCreated) await createDataset(DATASET_NAME)
    await evaluateDataset(DATASET_NAME)
}

main();
