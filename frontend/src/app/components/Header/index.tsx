'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';
import { useUser, CURRENT_USER_QUERY } from '@hooks/useUser';

const SIGN_OUT_MUTATION = gql`
	mutation {
		endSession
	}
`;

export const Header: React.FC = () => {
	const router = useRouter();
	const { user } = useUser();

	const [signout, { data, loading }] = useMutation(SIGN_OUT_MUTATION, {
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	const handleSignout = async (e: React.MouseEvent) => {
		e.preventDefault();
		const res = await signout();
		if (res.data.endSession) {
			// Redirect to homepage on successful sign out
			router.push('/');
		}
	};

	return (
		<nav className="flex justify-around w-full items-center fixed bg-background px-6 py-3 font-bold">
			<div className="flex w-full max-w-6xl items-center bg-background font-bold">
				<h1 className="mr-auto">
					<div className="logo flex items-center">
						<img src="/habitly-logo.svg" alt="Habitly Logo" className="h-5 w-5 mr-2" />
						<Link href="/" className="underline-squiggle lg:pointer-events-auto lg:p-0">
							Habitly
						</Link>
					</div>
				</h1>
				<div className="flex gap-5">
					{user ? (
						<button onClick={handleSignout} className="lg:pointer-events-auto lg:p-0">
							Log Out
						</button>
					) : (
						<>
							<Link href="/register" className="lg:pointer-events-auto lg:p-0">
								Register
							</Link>
							<Link href="/login" className="lg:pointer-events-auto lg:p-0">
								Log In
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};
