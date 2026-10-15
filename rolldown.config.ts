import { globSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';

import { defineConfig } from 'rolldown';

const apiSourceDirectory = resolve('apps/api/src');

const apiInputs = Object.fromEntries(
	globSync(`${apiSourceDirectory}/**/*.ts`).map((path) => [
		relative(apiSourceDirectory, path).replace(/\.ts$/, '').split(sep).join('/'),
		resolve(path)
	])
);

export default defineConfig({
	input: apiInputs,
	platform: 'node',
	output: {
		dir: 'dist',
		entryFileNames: '[name].js',
		format: 'esm',
		sourcemap: true
	}
});
