import {Client} from "langsmith";

export const test = async () => {

    const examplesTest: [string, string][] = [
        ["Esta es un lindo dia", "es",],
        ["This is a wonderful day", "en"],
        ["questa è una bellissima giornata", "it"],
    ];

    const inputs = examplesTest.map(([inputPrompt]) => ({
        question: inputPrompt,
    }));
    const outputs = examplesTest.map(([, outputAnswer]) => ({
        answer: outputAnswer,
    }));

    const client = new Client({apiKey: ""})
    const dataset = await client.createDataset("Language detection dataset");

    await client.createExamples({
        inputs,
        outputs,
        datasetId: dataset.id,
    });
}