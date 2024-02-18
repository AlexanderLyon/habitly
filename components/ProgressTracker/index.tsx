'use client';
import { useState } from 'react';
import { useHabits } from '@hooks/useHabits';
import { DotSlider } from '@components/ProgressTracker/DotSlider';
import { DayCompletionMenu } from '@components/ProgressTracker/DayCompletionMenu';

export const ProgressTracker: React.FC = () => {
	const { habits, days, markAsComplete, markAsIncomplete } = useHabits();
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);

	const changeSelectedDay = (selectedDay: Date) => {
		if (selectedDate?.toDateString() === selectedDay.toDateString()) {
			setSelectedDate(null);
		} else {
			setSelectedDate(selectedDay);
		}
	};

	if (!habits?.length) return null;

	return (
		<div className="my-10">
			<DotSlider selectedDate={selectedDate} changeSelectedDay={changeSelectedDay} />
			{selectedDate && (
				<DayCompletionMenu
					date={selectedDate}
					habits={habits}
					days={days}
					markAsComplete={markAsComplete}
					markAsIncomplete={markAsIncomplete}
				/>
			)}
		</div>
	);
};
