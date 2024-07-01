'use client';
import { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Button } from '@components/Button';
import { NewHabitForm } from '@components/NewHabitForm';
import { UserContext } from '@context/SessionContext';

interface Habit {
	id: string;
	description: string;
	completedDates: string;
	doneToday: boolean;
}

interface HabitListProps {
	habits: Habit[];
}

const UPDATE_HABIT_MUTATION = gql`
	mutation UPDATE_HABIT_MUTATION($id: ID!) {
		updateHabit(id: $id) {
			id
			completedDates
		}
	}
`;

function UserDashboard() {
	const [showNewHabitForm, setShowNewHabitForm] = useState(false);
	const [incompleteHabits, setIncompleteHabits] = useState([]);
	const [completedHabits, setCompletedHabits] = useState([]);
	const { user, refetch } = useContext(UserContext);
	const [updateHabit, { data, error, loading }] = useMutation(UPDATE_HABIT_MUTATION);

	const toggleCompletion = async (id: string) => {
		await updateHabit({
			variables: {
				id,
			},
		}).catch(console.error);

		refetch();
	};

	const HabitList: React.FC<HabitListProps> = ({ habits }) => (
		<ul className="habit-list list-none">
			{habits.map(habit => (
				<li
					key={habit.id}
					className="flex items-center my-2"
					onClick={() => toggleCompletion(habit.id)}
				>
					<input
						type="checkbox"
						className="shrink-0 mr-2 cursor-pointer"
						name={habit.id}
						id={habit.id}
						readOnly
						checked={habit.doneToday}
						onClick={() => toggleCompletion(habit.id)}
					/>
					<label className="cursor-pointer" htmlFor={habit.id}>
						{habit.description}
					</label>
				</li>
			))}
		</ul>
	);

	useEffect(() => {
		if (user && user.habits) {
			setIncompleteHabits(user.habits.filter(habit => !habit.doneToday) || []);
			setCompletedHabits(user.habits.filter(habit => habit.doneToday) || []);
		}
	}, [user]);

	return (
		<>
			<h1 className="text-4xl mb-3 pb-8 text-accent font-bold lg:text-left">
				Welcome, {user.name}!
			</h1>
			{!incompleteHabits.length && !completedHabits.length ? (
				<>
					<h2 className="text-2xl">Get started by adding your first habit</h2>
					<NewHabitForm />
				</>
			) : (
				<div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-4">
					<div className="bg-cardBackground p-4 rounded-lg flex flex-col">
						{incompleteHabits.length > 0 ? (
							<>
								<h2 className="text-xl my-3 mt-0">
									You have{' '}
									<span className="font-bold">
										{incompleteHabits.length} {incompleteHabits.length > 1 ? 'habits' : 'habit'}
									</span>{' '}
									to update
								</h2>
								<HabitList habits={incompleteHabits} />
							</>
						) : (
							<div className="text-center my-4">
								<h1 className="text-5xl text-center">🎉</h1>
								<h2 className="text-md my-3">
									You've completed all of your habits today, keep up the good work!
								</h2>
							</div>
						)}
						<div className="mt-auto">
							{showNewHabitForm ? (
								<NewHabitForm />
							) : (
								<Button className="my-4 mb-0 w-full" onClick={() => setShowNewHabitForm(true)}>
									Create New Habit
								</Button>
							)}
						</div>
					</div>
					<div className="bg-cardBackground p-4 rounded-lg">
						{completedHabits.length === 0 ? (
							<div className="text-center">
								<h2 className="text-xl my-3 mt-0">
									You haven't completed any of your habits yet today
								</h2>
								<p>Remember to check items off as you complete them!</p>
							</div>
						) : (
							<h2 className="text-xl my-3 mt-0">
								You've completed {completedHabits.length} of your habits so far today
							</h2>
						)}
						<HabitList habits={completedHabits} />
					</div>
				</div>
			)}
		</>
	);
}

export default UserDashboard;
