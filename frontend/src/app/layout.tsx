import type { Metadata } from 'next';
import { Header } from '@components/Header';
import ApolloContext from '../context/ApolloContext';
import './globals.css';

export const metadata: Metadata = {
	title: 'Habitly',
	description: 'Build lasting habits with Habitly.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<ApolloContext>
					<Header />
					<main className="min-h-screen pt-12">{children}</main>
				</ApolloContext>
			</body>
		</html>
	);
}
