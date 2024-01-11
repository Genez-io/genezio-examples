import { HelloWorld } from "./out.js";
import * as esbuild from "esbuild";
import path from "path";
import { nodeExternalsPlugin } from "esbuild-node-externals";

const helloInstance = new HelloWorld();
// helloInstance.hello("annna", "anna", "Winter");

// test.js
// const HelloWorld = require("./out.js");

// const instance = new HelloWorld();
// try {
//   instance.helloWorld();
// } catch (error) {
//   console.error(error);
// }

// eslint-disable-next-line no-async-promise-executor

const cwd = "../server";

let nodeExternalPlugin;
if (cwd) {
  nodeExternalPlugin = nodeExternalsPlugin({
    packagePath: path.join(cwd, "package.json"),
  });
} else {
  nodeExternalPlugin = nodeExternalsPlugin();
}

const supportRequireInESM = {
  name: "esbuild-require-plugin",
  setup(build) {
    build.onLoad({ filter: /\.m?[jt]sx?$/ }, async (args) => {
      function getLoader(extension) {
        switch (extension) {
          case "ts":
          case "mts":
            return "ts";
          case "tsx":
          case "mtsx":
            return "tsx";
          case "js":
          case "mjs":
            return "js";
          case "jsx":
          case "mjsx":
            return "jsx";
          default:
            return "js";
        }
      }

      const _cwd = cwd ?? process.cwd();
      const relativePath = path.relative(_cwd, args.path);
      const components = relativePath.split(path.sep);
      const contents = await fs.promises.readFile(args.path, "utf8");
      const loader = getLoader(args.path.split(".").pop());

      // Check if file comes from node_modules
      if (components.length >= 1 && components.includes("node_modules")) {
        return { contents, loader };
      }

      // Check if file doesn't use require()
      if (!contents.includes("require(")) {
        return { contents, loader };
      }

      // Check if file uses require() for relative paths
      const regex = /require\(['"]\.\.?(?:\/[\w.-]+)+['"]\);?/g;
      const lineContents = contents.split(os.EOL);
      for (let i = 0; i < lineContents.length; i++) {
        const line = lineContents[i];
        if (regex.test(line)) {
          return {
            errors: [
              {
                text: `genezio does not support require() for relative paths. Please use import statements instead. For example: "const a = require("./b");" should be "import a from "./b";" or "const a = await import("./b");"`,
                location: {
                  file: args.path,
                  namespace: "file",
                  lineText: line,
                  line: i + 1,
                },
              },
            ],
          };
        }
      }
      return {
        contents: `import { createRequire } from 'module';
          const require = createRequire(import.meta.url);
          ${contents}`,
        loader,
      };
    });
  },
};

await esbuild.build({
  entryPoints: ["hello.ts"],
  bundle: true,
  metafile: true,
  sourcemap: "inline",
  outfile: "out.mjs",
  format: "esm",
  plugins: [nodeExternalPlugin],
  platform: "node",
});
