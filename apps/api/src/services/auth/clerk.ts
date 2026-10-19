import { verifyToken } from '@clerk/backend';
import type { FastifyRequest } from 'fastify';

import type { AuthInterface, AuthUser } from './auth.interface.ts';

export class ClerkAuth implements AuthInterface {
	async getUser(request: FastifyRequest): Promise<AuthUser | null> {
		const token = getSessionToken(request);
		if (!token) return null;

		const secretKey = process.env['CLERK_SECRET_KEY'];
		if (!secretKey) {
			throw new Error('CLERK_SECRET_KEY must be set to verify Clerk session tokens');
		}
		const authorizedParties = process.env['CLERK_AUTHORIZED_PARTIES']
			?.split(',')
			.map((party) => party.trim())
			.filter(Boolean);
		if (!authorizedParties?.length) {
			throw new Error('CLERK_AUTHORIZED_PARTIES must list the trusted application origins');
		}

		try {
			const claims = await verifyToken(token, {
				secretKey,
				authorizedParties
			});
			return typeof claims.sub === 'string' ? { id: claims.sub } : null;
		} catch {
			return null;
		}
	}
}

function getSessionToken(request: FastifyRequest): string | undefined {
	const authorization = request.headers.authorization;
	const bearerToken = authorization?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
	if (bearerToken) return bearerToken;

	const cookies = request.headers.cookie?.split(';') ?? [];
	for (const cookie of cookies) {
		const separator = cookie.indexOf('=');
		if (separator < 0 || cookie.slice(0, separator).trim() !== '__session') continue;

		const token = cookie.slice(separator + 1).trim();
		if (token) return token;
	}

	return undefined;
}

export const clerkAuth = new ClerkAuth();
