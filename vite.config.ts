import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: "src",
        name: "catchjs",
        formats: ["es"],
      },
    },
  };
});
