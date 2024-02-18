import type { Metadata } from 'next';
import { HabitsProvider } from '@context/HabitsProvider';
import { Header } from '@components/Header';
import './ui/globals.css';

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
				<Header />
				<main className="min-h-screen w-full m-auto max-w-6xl pt-12">
					<div className="px-6 py-12 md:py-24">
						<HabitsProvider>{children}</HabitsProvider>
					</div>
				</main>
			</body>
		</html>
	);
}
