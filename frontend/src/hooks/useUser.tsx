import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
	query {
		authenticatedItem {
			... on User {
				id
				email
				name
				habits {
					id
					description
					completedDates
					doneToday
				}
			}
		}
	}
`;

export function useUser() {
	const { data, loading } = useQuery(CURRENT_USER_QUERY);
	return { user: data?.authenticatedItem, loading };
}
