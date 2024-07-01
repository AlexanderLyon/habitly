'use client';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserContext } from '@context/SessionContext';
import useForm from '@hooks/useForm';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { Alert } from '@components/Alert';

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			user {
				id
			}
			jwt
			errors {
				message
			}
		}
	}
`;

const LoginPage = () => {
	const { refetch } = useContext(UserContext);
	const router = useRouter();
	const { inputs, handleChange, resetForm } = useForm({
		email: '',
		password: '',
	});

	const [signin, { data, loading, error }] = useMutation(SIGNIN_MUTATION, {
		variables: inputs,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const res = await signin();

		if (res.data.login.user?.id) {
			// Redirect to dashboard on successful sign in
			resetForm();
			localStorage.setItem('userId', res.data.login.user.id);
			localStorage.setItem('jwtToken', res.data.login.jwt);
			refetch();
			router.push('/');
		}
	};

	return (
		<div className="px-6 py-12 md:p-24">
			<h2 className="text-center">Sign In</h2>
			{error && <Alert className="mb-6">{error.message}</Alert>}
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
