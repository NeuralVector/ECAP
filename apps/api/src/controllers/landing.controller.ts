import { GET, Controller } from 'fastify-decorators';

@Controller({ route: '/' })
export default class LandingController {
	@GET()
	async landingHandler() {}
}
