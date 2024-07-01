'use client';
import { useContext } from 'react';
import { UserContext } from '@context/SessionContext';
import Link from 'next/link';
import { Spinner } from '@components/Spinner';
import { Quote } from '@components/Quote';
import UserDashboard from '@components/UserDashboard';

function Home() {
	const { user, loading } = useContext(UserContext);

	const GuestOnboarding: React.FC = () => (
		<div className="text-center">
			<h1 className="text-4xl mb-5 text-accent font-bold">Welcome to Habitly</h1>
			<h2 className="text-2xl mb-10">
				<Link href="/register">Register now to start growing lasting habits today!</Link>
			</h2>
		</div>
	);

	if (loading) {
		return (
			<div className="flex justify-center my-20">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center justify-between px-6 py-12 md:p-24">
			<div className="max-w-6xl w-full items-center justify-between text-sm">
				{user ? <UserDashboard /> : <GuestOnboarding />}
			</div>
			<Quote />
		</div>
	);
}

export default Home;
