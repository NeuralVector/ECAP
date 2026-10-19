import type { FastifyReply, FastifyRequest } from 'fastify';
import { GET, Controller } from 'fastify-decorators';

@Controller({ route: '/' })
export default class LandingController {
	@GET()
	async landingHandler(request: FastifyRequest, reply: FastifyReply) {
		const user = await request.server.auth.getUser(request);
		if (user) {
			reply.redirect('/dashboard');
			return;
		}

		await this.renderNext(request, reply);
	}

	@GET('/sign-in')
	async signInHandler(request: FastifyRequest, reply: FastifyReply) {
		await this.renderNext(request, reply);
	}

	@GET('/sign-in/*')
	async signInFlowHandler(request: FastifyRequest, reply: FastifyReply) {
		await this.renderNext(request, reply);
	}

	@GET('/sign-up')
	async signUpHandler(request: FastifyRequest, reply: FastifyReply) {
		await this.renderNext(request, reply);
	}

	@GET('/sign-up/*')
	async signUpFlowHandler(request: FastifyRequest, reply: FastifyReply) {
		await this.renderNext(request, reply);
	}

	private async renderNext(request: FastifyRequest, reply: FastifyReply) {
		reply.hijack();
		await request.server.handleNext(request.raw, reply.raw);
	}
}
