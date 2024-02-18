'use client';
import { useState } from 'react';
import { useHabits } from '@hooks/useHabits';
import { NewHabitForm } from '@components/NewHabitForm';
import { Spinner } from '@components/Spinner';
import { Button } from '@components/Button';
import { Habit } from '@lib/types';

const Edit = () => {
	const [editModeEnabled, setEditModeEnabled] = useState(false);
	const [addModeEnabled, setAddModeEnabled] = useState(false);
	const { habits, isFetching, removeHabit } = useHabits();

	if (isFetching) {
		return <Spinner />;
	}

	const HabitCard: React.FC<{ habit: Habit }> = ({ habit }) => {
		const dateCreated = new Date(habit.dateCreated).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});

		return (
			<>
				{editModeEnabled && (
					<Button
						condensed
						onClick={() => {
							if (
								window.confirm(
									`Are you sure you want to delete your ${habit.title} habit? This will also delete all tracked progress and cannot be undone.`,
								)
							) {
								removeHabit(habit.id);
							}
						}}
					>
						&times;
					</Button>
				)}
				<div>
					<p className="font-bold">{habit.title}</p>
					<p>{habit.description}</p>
					<p className="text-xs italic">Started tracking on {dateCreated}</p>
				</div>
			</>
		);
	};

	return (
		<div>
			{habits && habits.length ? (
				<>
					<div className="flex place-content-between items-center align-middle mb-10">
						<h1 className="text-xl font-semibold">
							You're currently tracking {habits.length} habits
						</h1>
						<Button onClick={() => setEditModeEnabled(!editModeEnabled)}>
							{editModeEnabled ? 'Close' : 'Edit'}
						</Button>
					</div>
					<ul className="flex flex-col gap-4 my-4">
						{habits.map(habit => (
							<li key={habit.id} className="flex items-center gap-4">
								<HabitCard habit={habit} />
							</li>
						))}
					</ul>
					<div>
						{addModeEnabled ? (
							<NewHabitForm />
						) : (
							<Button onClick={() => setAddModeEnabled(true)}>Add a New Habit</Button>
						)}
					</div>
				</>
			) : (
				<>
					<p className="mb-10">You currently have no habits being tracked. Add your first one!</p>
					<NewHabitForm />
				</>
			)}
		</div>
	);
};

export default Edit;
