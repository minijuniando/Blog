import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/test/**/*.test.ts"],
    name: "minijuniando-unit",
    environment: "node",
    env: {
      PORT: "3334",
      MONGODB_URI: "mongodb://localhost:27017/test",
      TOKEN_SECRET: "supersecret",
    },
  },
});
