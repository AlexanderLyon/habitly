'use client';
import { ApolloLink, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/link-error';
import {
	ApolloNextAppProvider,
	ApolloClient,
	InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

function makeClient() {
	const httpLink = createHttpLink({
		uri: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
		fetchOptions: {
			credentials: 'include',
		},
	});

	const authLink = setContext((_, { headers }) => {
		const token = localStorage.getItem('jwtToken');
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		};
	});

	return new ApolloClient({
		cache: new InMemoryCache(),
		link: ApolloLink.from([
			onError(({ graphQLErrors, networkError }) => {
				if (graphQLErrors)
					graphQLErrors.forEach(({ message, locations, path }) =>
						console.log(
							`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
						),
					);
				if (networkError)
					console.log(`[Network error]: ${networkError}. Backend is unreachable. Is it running?`);
			}),
			authLink.concat(httpLink),
		]),
	});
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
	return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
