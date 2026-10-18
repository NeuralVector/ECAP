import type { FastifyRequest } from 'fastify';

export interface AuthUser {
	id: string;
}

export interface AuthInterface {
	getUser(req: FastifyRequest): Promise<AuthUser | null>;
}
