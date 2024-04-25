module.exports = {
  parser: "svelte-eslint-parser",
  plugins: ["svelte3"],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3",
    },
  ],
};
