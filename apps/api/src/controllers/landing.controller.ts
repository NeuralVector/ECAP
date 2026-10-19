import type { FastifyReply, FastifyRequest } from 'fastify';
import { GET, Controller } from 'fastify-decorators';

@Controller({ route: '/' })
export default class LandingController {
	@GET()
	async landingHandler(request: FastifyRequest, reply: FastifyReply) {
		reply.hijack();
		await request.server.handleNext(request.raw, reply.raw);
	}
}
