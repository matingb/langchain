import { Client, Example, Run } from "langsmith";
import dotenv from "dotenv";
import { detectLanguage } from "../languageService.ts";
import { evaluate, EvaluationResult } from "langsmith/evaluation";
import chalk from "chalk";

dotenv.config();

const client = new Client({ apiKey: process.env.LANGSMITH_API_KEY });
const DATASET_NAME = "Language Detection";

async function createDataset(datasetName: string) {
    console.log(chalk.blue(`Creating dataset "${datasetName}"...`));

    const dataset = await client.createDataset(datasetName);

    const examplesTest: [string, string][] = [
        ["Esta es un lindo dia", "es"],
        ["This is a wonderful day", "en"],
        ["questa è una bellissima giornata", "it"],
    ];

    const inputs = examplesTest.map(([inputPrompt, _]) => ({ question: inputPrompt }));
    const outputs = examplesTest.map(([, outputAnswer]) => ({ answer: outputAnswer }));

    await client.createExamples({
        inputs,
        outputs,
        datasetId: dataset.id,
    });

    console.log(chalk.green(`Dataset "${datasetName}" created successfully with ${examplesTest.length} examples.`));
}

async function evaluateDataset(datasetName: string) {
    console.log(chalk.blue(`Evaluating dataset "${datasetName}"...\n`));

    const result = await evaluate(
        async (exampleInput: { question: string }) => {
            const response = await detectLanguage(exampleInput.question);
            return { answer: response.language };
        },
        {
            data: datasetName,
            evaluators: [isEqual],
            experimentPrefix: "Language detection experiment",
        }
    );

    const failedResults = result.results.filter(res =>
        res.evaluationResults.results.some(ev => ev.score === false)
    );

    if (failedResults.length > 0) {
        console.log(chalk.red(`\nValidation failed for ${failedResults.length} example(s).\n`));
        failedResults.forEach((res, idx) => {
            const input = res.run.inputs?.question;
            const expected = res.example?.outputs?.answer;
            const actual = res.run.outputs?.answer;
            console.log(chalk.red(`- [${idx + 1}] Question: "${input}"`));
            console.log(chalk.red(`   Expected: "${expected}" | Got: "${actual}"\n`));
        });
        throw new Error("Validation failed. Please review the mismatches above.");
    }

    console.log(chalk.greenBright("\nAll examples passed validation successfully!"));
}

function isEqual(rootRun: Run, example?: Example): EvaluationResult {
    const score = rootRun.outputs?.answer.toString() === example?.outputs?.answer.toString();
    return { key: "string-match", score };
}

async function main() {
    console.log(chalk.blue(`\n\nStarting ${DATASET_NAME} Evaluation`));
    const isDatasetCreated = await client.hasDataset({ datasetName: DATASET_NAME });

    if (!isDatasetCreated) {
        console.log(chalk.blue(`Dataset "${DATASET_NAME}" does not exist.`));
        await createDataset(DATASET_NAME);
    }

    await evaluateDataset(DATASET_NAME);
}

main();
