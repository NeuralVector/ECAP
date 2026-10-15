import Fastify from 'fastify';

const app = Fastify({ logger: true });

app.get('/', async () => ({ message: 'Hello from Fastify!' }));

export default app;
