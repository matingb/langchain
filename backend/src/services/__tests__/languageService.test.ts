import {vi} from "vitest";
import {detectLanguage} from "../languageService";

const invokeMock = vi.hoisted(() => vi.fn())
vi.mock("../modelService", async () => ({
    ...(await vi.importActual("../modelService")),
    languageDetectionModel: {invoke: invokeMock},
}));

describe("detectLanguage", () => {

    beforeEach(() => { vi.restoreAllMocks() });

    it("given a message in spanish, should return the detected language", async () => {
        invokeMock.mockReturnValue({language: "es", notes: "Texto en español"})

        const result = await detectLanguage("Hola, ¿cómo estás?");

        expect(result).toEqual({
            language: "es",
            notes: "Texto en español",
        });
    });

    it("given no language, should throw an error", async () => {
        invokeMock.mockResolvedValue({language: ""});

        await expect(detectLanguage("Hello!")).rejects.toThrow(
            "Language detection failed: missing language field"
        );
    });
});
