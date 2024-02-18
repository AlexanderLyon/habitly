'use client';
import Link from 'next/link';

export const Header: React.FC = () => (
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
				<Link href="/" className="lg:pointer-events-auto lg:p-0">
					Dashboard
				</Link>
				<Link href="/list" className="lg:pointer-events-auto lg:p-0">
					My Habits
				</Link>
			</div>
		</div>
	</nav>
);
