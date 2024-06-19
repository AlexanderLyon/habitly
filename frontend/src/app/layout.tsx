import type { Metadata } from 'next';
import { Header } from '@components/Header';
import { ApolloWrapper } from '../context/ApolloContext';
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
				<ApolloWrapper>
					<Header />
					<main className="min-h-screen pt-12">{children}</main>
				</ApolloWrapper>
			</body>
		</html>
	);
}
