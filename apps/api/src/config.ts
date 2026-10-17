import convict from 'convict';

const config = convict({
	server: {
		host: {
			format: String,
			default: 'localhost',
			env: 'HOST'
		},
		port: {
			format: 'port',
			default: 3000,
			env: 'PORT'
		}
	}
});

config.validate({ allowed: 'strict' });

export default config;
