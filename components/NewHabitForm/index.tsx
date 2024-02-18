'use client';
import { useState } from 'react';
import { useHabits } from '@hooks/useHabits';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { Alert } from '@components/Alert';

export const NewHabitForm: React.FC = () => {
	const { addHabit } = useHabits();
	const [successMessage, setSuccessMessage] = useState<string>();
	const [errorMessage, setErrorMessage] = useState<string>();

	const handleSubmit = (formData: FormData) => {
		try {
			const title = formData.get('title') as string;
			const description = formData.get('description') as string;
			addHabit({ title, description });
			setSuccessMessage('Habit added successfully!');
		} catch (error) {
			setErrorMessage('An error occurred. Please try again.');
		}
	};

	return (
		<>
			<form action={handleSubmit} className="max-w-xl">
				<div className="flex flex-col gap-4">
					<label className="flex flex-col gap-2">
						What new habit would you like to build?
						<Input type="text" name="title" required />
					</label>
					<label className="flex flex-col gap-2">
						How do you plan to achieve this?
						<Input type="text" name="description" placeholder="Optional" />
					</label>
					<Button>Start Tracking</Button>
					{errorMessage ? (
						<Alert variant="error">{errorMessage}</Alert>
					) : successMessage ? (
						<Alert variant="success">{successMessage}</Alert>
					) : null}
				</div>
			</form>
		</>
	);
};
