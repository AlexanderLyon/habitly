'use client';
import { useHabits } from '@hooks/useHabits';

interface DotSliderProps {
	selectedDate: Date | null;
	changeSelectedDay: (date: Date) => void;
}

interface DotProps {
	date: Date;
	isOpen?: boolean;
	onClick: () => void;
	percentageCompleted: number;
}

const Dot: React.FC<DotProps> = ({ date, isOpen, onClick, percentageCompleted }) => {
	const isToday = date.toDateString() === new Date().toDateString();
	const dayTitle = date.toLocaleDateString('en-US', {
		weekday: 'short',
		month: 'short',
		day: 'numeric',
	});

	return (
		<div
			className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer"
			onClick={onClick}
		>
			<div
				className={`h-9 w-9 flex items-center justify-center ${percentageCompleted === 100 ? 'bg-accent' : isToday ? 'bg-black' : 'bg-gunmetal'} ${isOpen ? 'border border-accent' : ''} rounded-full`}
			>
				{isOpen && <span className="text-white text-xs">{percentageCompleted}%</span>}
			</div>
			<span className="text-xs font-semibold">{isToday ? 'Today' : dayTitle}</span>
		</div>
	);
};

export const DotSlider: React.FC<DotSliderProps> = ({ selectedDate, changeSelectedDay }) => {
	const { habits, days } = useHabits();
	const today = new Date();
	const daysBeingTracked: Date[] = [];

	// How many of todays habits have been completed?
	const totalHabits = habits.length;
	const todaysEntries = days[today.toDateString()] || [];
	const percentageCompleted = Math.floor((todaysEntries.length / totalHabits) * 100);

	const earliestHabitDate = habits.reduce((earliestDate: Date, habit) => {
		const habitDate = new Date(habit.dateCreated);
		return habitDate < earliestDate ? habitDate : earliestDate;
	}, new Date(habits[0].dateCreated));

	let currentDate = new Date(earliestHabitDate);

	while (currentDate <= today) {
		daysBeingTracked.push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}

	return (
		<div className="flex gap-4 overflow-auto w-full">
			{daysBeingTracked.map((day, index) => (
				<Dot
					key={index}
					date={day}
					percentageCompleted={percentageCompleted}
					isOpen={selectedDate?.toDateString() === day.toDateString()}
					onClick={() => changeSelectedDay(day)}
				/>
			))}
		</div>
	);
};
