import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Permite usar funciones como "describe" y "test" sin importar
    environment: "node", // Especifica que es un entorno de Node.js
    setupFiles: ["dotenv/config"], // Carga variables del .env automáticamente
  },
});
