'use client';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CURRENT_USER_QUERY } from '@hooks/useUser';
import useForm from '@hooks/useForm';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Alert } from '@components/Alert';

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		authenticateUserWithPassword(email: $email, password: $password) {
			... on UserAuthenticationWithPasswordSuccess {
				item {
					id
					email
					name
				}
			}
			... on UserAuthenticationWithPasswordFailure {
				code
				message
			}
		}
	}
`;

const LoginPage = () => {
	const router = useRouter();
	const { inputs, handleChange, resetForm } = useForm({
		email: '',
		password: '',
	});

	const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
		variables: inputs,
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await signin();
		if (
			res.data.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordSuccess'
		) {
			// Redirect to dashboard on successful sign in
			router.push('/');
		}
		resetForm();
	};

	const error =
		data?.authenticateUserWithPassword.__typename === 'UserAuthenticationWithPasswordFailure'
			? data?.authenticateUserWithPassword
			: undefined;

	return (
		<div className="px-6 py-12 md:p-24">
			<h2 className="text-center">Sign In</h2>
			{error && <Alert>{error.message}</Alert>}
			<form
				method="POST"
				onSubmit={handleSubmit}
				className="flex flex-col justify-center items-center my-8"
			>
				<Input
					type="text"
					placeholder="Email address"
					name="email"
					value={inputs.email}
					className="my-1"
					onChange={handleChange}
				/>
				<Input
					type="password"
					placeholder="Password"
					name="password"
					value={inputs.password}
					className="my-1"
					onChange={handleChange}
				/>
				<Button type="submit" className="my-1" disabled={loading}>
					Sign in
				</Button>
			</form>
			<div className="text-center">
				<Link href="/register" className="justify-center lg:pointer-events-auto lg:p-0">
					Register for an account
				</Link>
			</div>
		</div>
	);
};

export default LoginPage;
