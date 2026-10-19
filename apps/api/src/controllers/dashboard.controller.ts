import type { FastifyReply, FastifyRequest } from 'fastify';
import { Controller, GET } from 'fastify-decorators';

@Controller({ route: '/dashboard' })
export default class DashboardController {
	@GET()
	async dashboardHandler(request: FastifyRequest, reply: FastifyReply) {
		const user = await request.server.auth.getUser(request);
		if (!user) {
			reply.redirect('/sign-in');
			return;
		}

		reply.code(204).send();
	}
}
