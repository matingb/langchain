import {vi} from "vitest";
import {detectLanguage} from "../languageService";

const invokeMock = vi.hoisted(() => vi.fn())
vi.mock("../modelService", async () => ({
    ...(await vi.importActual("../modelService")),
    model: {
        withStructuredOutput: () => ({
            invoke: () => ({language: "es", notes: "Texto en español"})
        }),
    },
}));

describe("detectLanguage", () => {

    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("debería detectar el idioma correctamente", async () => {
        invokeMock.mockReturnValue({language: "es", notes: "Texto en español"})

        const result = await detectLanguage("Hola, ¿cómo estás?");

        expect(result).toEqual({
            language: "es",
            notes: "Texto en español",
        });
    });

    // it("debería lanzar un error si el modelo no devuelve un idioma", async () => {
    //     mockInvoke.mockResolvedValue({language: ""});
    //
    //     await expect(detectLanguage("Hello!")).rejects.toThrow(
    //         "Language detection failed: missing language field"
    //     );
    // });
    //
    // it("debería manejar una respuesta sin notas", async () => {
    //     mockInvoke.mockResolvedValue({language: "en", notes: undefined});
    //
    //     const result = await detectLanguage("Hello!");
    //
    //     expect(result).toEqual({
    //         language: "en",
    //         notes: null, // Se normaliza a null si `notes` es undefined
    //     });
    // });
});
