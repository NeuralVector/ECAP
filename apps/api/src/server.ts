import './env.ts';
import app from './app.ts';
import config from './config.ts';

try {
	await app.listen(config.get('server'));
} catch (error) {
	console.error(error);
	process.exitCode = 1;
}
