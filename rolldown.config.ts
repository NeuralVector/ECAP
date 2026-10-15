import { defineConfig } from 'rolldown';

export default defineConfig({
	input: 'apps/api/src/server.ts',
	platform: 'node',
	output: {
		file: 'dist/server.js',
		format: 'esm',
		sourcemap: true
	}
});
