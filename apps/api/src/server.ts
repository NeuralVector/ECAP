import app from './app.ts';

const port = Number(process.env['PORT'] ?? 3000);
const host = process.env['HOST'] ?? '0.0.0.0';

try {
	await app.listen({ port, host });
} catch (error) {
	console.error(error);
	process.exitCode = 1;
}
