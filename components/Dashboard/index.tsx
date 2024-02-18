'use client';
import { useHabits } from '@hooks/useHabits';
import { Spinner } from '@components/Spinner';
import { ProgressTracker } from '@components/ProgressTracker';
import { NewHabitForm } from '@components/NewHabitForm';

export const Dashboard: React.FC = () => {
	const { isFetching } = useHabits();

	if (isFetching) {
		return <Spinner />;
	}

	return (
		<div>
			<h1 className="text-xl mb-10 font-semibold">Dashboard</h1>
			<ProgressTracker />
			<NewHabitForm />
		</div>
	);
};
