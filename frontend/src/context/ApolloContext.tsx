'use client';
import { ApolloProvider } from '@apollo/client';
import withData from '@hooks/withData';

const ApolloContext: React.FC = ({ children, apollo }: any) => {
	return <ApolloProvider client={apollo}>{children}</ApolloProvider>;
};

export default withData(ApolloContext);
