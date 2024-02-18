import { Input } from '@components/Input';
import { Habit, TrackedDays } from '@lib/types';

interface DayCompletionMenuProps {
	date: Date;
	habits: Habit[];
	days: TrackedDays;
	markAsComplete: (habitId: number, date: Date) => void;
	markAsIncomplete: (habitId: number, date: Date) => void;
}

export const DayCompletionMenu: React.FC<DayCompletionMenuProps> = ({
	date,
	habits,
	days,
	markAsComplete,
	markAsIncomplete,
}) => {
	const isToday = date.toDateString() === new Date().toDateString();
	const dayTitle = isToday
		? 'today'
		: date.toLocaleDateString('en-US', {
				weekday: 'long',
			});

	const onCompleted = async (habitId: number) => {
		await markAsComplete(habitId, date);
	};

	const onUncompleted = async (habitId: number) => {
		await markAsIncomplete(habitId, date);
	};

	return (
		<div>
			<p className="mb-2">What did you complete {dayTitle}?</p>
			<ul>
				{habits.map(habit => (
					<li key={`${date}-${habit.id}`}>
						<label className="flex flex-row items-center gap-2">
							<Input
								type="checkbox"
								checked={days[date.toDateString()]?.includes(habit.id)}
								onChange={e => {
									if (e.target.checked) {
										onCompleted(habit.id);
									} else {
										onUncompleted(habit.id);
									}
								}}
							/>
							<p>{habit.title}</p>
						</label>
					</li>
				))}
			</ul>
		</div>
	);
};
