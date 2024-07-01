'use client';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import useForm from '@hooks/useForm';
import { UserContext } from '@context/SessionContext';

const ADD_HABIT_MUTATION = gql`
	mutation ADD_HABIT_MUTATION($description: String!) {
		addNewHabit(description: $description) {
			id
			description
		}
	}
`;

export const NewHabitForm: React.FC = () => {
	const { refetch } = useContext(UserContext);
	const { inputs, handleChange, resetForm } = useForm({
		description: '',
	});

	const [addNewHabit, { data, error, loading }] = useMutation(ADD_HABIT_MUTATION, {
		variables: inputs,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await addNewHabit().catch(console.error);
		resetForm();
		refetch();
	};

	return (
		<form onSubmit={handleSubmit} className="flex my-4 mb-0">
			<Input
				type="text"
				name="description"
				value={inputs.description}
				onChange={handleChange}
				placeholder="New habit"
				className="mr-2"
			/>
			<Button type="submit" disabled={loading || !inputs.description.length}>
				{loading ? 'Adding...' : 'Add'}
			</Button>
		</form>
	);
};
