import { vi } from "vitest";
import { translatorService } from "../translationService.js";

const invokeMock = vi.hoisted(() => vi.fn());
vi.mock("../modelService", async () => ({
  ...(await vi.importActual("../modelService")),
  model: { invoke: invokeMock },
}));

describe("translateText", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should return translated content without tone", async () => {
    invokeMock.mockResolvedValue({ content: "Texto traducido" });
    const sourceLang = "en";
    const targetLang = "es";

    const result = await translatorService.translateText({
      input: "Hello",
      sourceLang: sourceLang,
      targetLang: targetLang,
      toneStyles: [],
    });

    expect(result).toBe("Texto traducido");
    expect(invokeMock).toHaveBeenCalledWith([
      expect.objectContaining({
        content: expect.stringContaining(`Translate from ${sourceLang} to ${targetLang}.`),
      }),
      expect.objectContaining({ content: "Hello" }),
    ]);
  });

  it("should include tone instruction when toneStyles is not empty", async () => {
    invokeMock.mockResolvedValue({ content: "Texto con tono" });

    await translatorService.translateText({
      input: "Hi",
      sourceLang: "en",
      targetLang: "es",
      toneStyles: ["friendly", "polite"],
    });

    expect(invokeMock).toHaveBeenCalledWith([
      expect.objectContaining({
        content: expect.stringContaining("Use the following tones: friendly - polite."),
      }),
      expect.anything(),
    ]);
  });
});
