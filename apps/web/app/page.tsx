import { Show, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Page() {
	return (
		<main>
			<Show when='signed-out'>
				<h1>Welcome</h1>
				<p>Sign in to continue, or create an account to get started.</p>
				<nav aria-label='Authentication'>
					<Link href='/sign-in'>Sign in</Link> <Link href='/sign-up'>Sign up</Link>
				</nav>
			</Show>
			<Show when='signed-in'>
				<h1>You’re signed in</h1>
				<p>Your account is ready.</p>
				<UserButton />
			</Show>
		</main>
	);
}
