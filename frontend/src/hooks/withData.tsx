import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/link-error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { HttpLink } from '@apollo/client';
import withApollo from 'next-with-apollo';

function createClient({ headers, initialState }: any) {
	const link = new HttpLink({
		uri: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT,
		fetchOptions: {
			credentials: 'include',
		},
		// pass the headers along from this request. This enables SSR with logged in state
		headers,
	});

	return new ApolloClient({
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
			link,
		]),
		cache: new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						// TODO
					},
				},
			},
		}).restore(initialState || {}),
	});
}

export default withApollo(createClient, { getDataFromTree });
