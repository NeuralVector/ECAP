import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

import Fastify from 'fastify';
import { bootstrap } from 'fastify-decorators';

const require = createRequire(import.meta.url);
const next: typeof import('next').default = require('next');

const app = Fastify({ logger: process.env['NODE_ENV'] !== 'production' });

const nextApp = next({
	dev: process.env['NODE_ENV'] !== 'production',
	dir: fileURLToPath(import.meta.resolve('#web'))
});

await nextApp.prepare();
const handleNext = nextApp.getRequestHandler();

app.decorate('handleNext', handleNext);

app.addHook('onClose', async () => {
	await nextApp.close();
});

declare module 'fastify' {
	interface FastifyInstance {
		handleNext: typeof handleNext;
	}
}

app.register(bootstrap, {
	directory: fileURLToPath(new URL('./controllers', import.meta.url)),
	mask: /\.controller\.[jt]s$/
});

export default app;
