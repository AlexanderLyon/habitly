'use client';
import { useState, createContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

interface IUserContext {
	user: any;
	loading: boolean;
	refetch: () => void;
}

export const CURRENT_USER_QUERY = gql`
	query GetUser($id: ID) {
		getUser(id: $id) {
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
`;

export const UserContext = createContext<IUserContext>({
	user: null,
	loading: false,
	refetch: () => {},
});

export function SessionContext({ children }: React.PropsWithChildren) {
	const [userId, setUserId] = useState<string>();

	const { data, loading, refetch } = useQuery(CURRENT_USER_QUERY, {
		variables: { id: userId },
	});

	useEffect(() => {
		setUserId(localStorage.getItem('userId') || '');
	}, []);

	const user = data?.getUser;

	return <UserContext.Provider value={{ user, loading, refetch }}>{children}</UserContext.Provider>;
}
