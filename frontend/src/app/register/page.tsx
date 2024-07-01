'use client';
import { gql, useMutation } from '@apollo/client';
import useForm from '@hooks/useForm';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Alert } from '@components/Alert';
import Link from 'next/link';

const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
		signup(email: $email, name: $name, password: $password) {
			user {
				id
				email
				name
			}
			errors {
				message
			}
		}
	}
`;

const Register: React.FC = () => {
	const { inputs, handleChange, resetForm } = useForm({
		email: '',
		name: '',
		password: '',
	});

	const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
		variables: inputs,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await signup().catch(console.error);
		resetForm();
	};

	return (
		<div className="px-6 py-12 md:p-24">
			<h2 className="text-center">Register For An Account</h2>
			<form
				method="POST"
				onSubmit={handleSubmit}
				className="flex flex-col justify-center items-center my-8"
			>
				{error && <Alert className="mb-6">{error.message}</Alert>}
				{data?.signup?.user ? (
					<p>Signed up with {data.signup.user.email} - Please go ahead and sign in!</p>
				) : (
					<>
						<Input
							type="text"
							name="name"
							id="sign-up-first-name"
							autoComplete="name"
							placeholder="Name"
							value={inputs.name}
							className="my-1"
							onChange={handleChange}
						/>
						<Input
							type="email"
							name="email"
							id="sign-up-email"
							autoComplete="email"
							placeholder="Email address"
							value={inputs.email}
							className="my-1"
							onChange={handleChange}
						/>
						<Input
							type="password"
							name="password"
							id="sign-up-password"
							placeholder="Password"
							value={inputs.password}
							className="my-1"
							onChange={handleChange}
						/>
						<Button type="submit" className="my-1" disabled={loading}>
							Register
						</Button>
					</>
				)}
			</form>
			<div className="text-center">
				<Link href="/login" className="justify-center lg:pointer-events-auto lg:p-0">
					Already have an account?
				</Link>
			</div>
		</div>
	);
};

export default Register;
