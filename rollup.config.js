// See: https://rollupjs.org/introduction/
// Bundles src/main.ts and src/post.ts into ESM files that the action runtime
// (node24, "type": "module") can load directly.

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const entry = (name) => ({
	input: `src/${name}.ts`,
	output: {
		esModule: true,
		file: `dist/${name}/index.js`,
		format: "es",
		sourcemap: true,
	},
	plugins: [
		typescript(),
		nodeResolve({ preferBuiltins: true }),
		commonjs(),
		json(),
	],
});

export default [entry("main"), entry("post")];
