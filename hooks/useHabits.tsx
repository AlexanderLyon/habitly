import { useContext } from 'react';
import { HabitsContext } from '@context/HabitsProvider';
import { Habit, TrackedDays } from '@lib/types';

type NewHabitDetails = {
	title: string;
	description?: string;
};

interface UseHabits {
	habits: Habit[];
	days: TrackedDays;
	addHabit: (habit: NewHabitDetails) => void;
	removeHabit: (id: number) => void;
	markAsComplete: (id: number, date: Date) => void;
	markAsIncomplete: (id: number, date: Date) => void;
	isFetching: boolean;
}

export const useHabits = (): UseHabits => {
	const context = useContext(HabitsContext);

	if (context === undefined) {
		throw new Error('useHabits must be used within a HabitsProvider');
	}

	const localHabits: Habit[] = context.localHabitsData?.habits || [];
	const localDays: TrackedDays = context.localHabitsData?.days || {};

	const addHabit = (habit: NewHabitDetails) => {
		const newHabit = {
			id: Math.floor(Date.now() * Math.random()),
			title: habit.title,
			description: habit.description,
			dateCreated: new Date(),
		};

		context.setLocalHabitsData({
			days: localDays,
			habits: [...localHabits, newHabit],
		});
	};

	const removeHabit = (id: number) => {
		if (!context.localHabitsData) {
			return;
		}
		const existingHabits = context.localHabitsData.habits || [];
		const updatedHabits = existingHabits.filter(habit => habit.id !== id);
		context.setLocalHabitsData({
			habits: updatedHabits,
			days: localDays,
		});
	};

	const markAsComplete = (id: number, date: Date) => {
		const updatedDays = { ...localDays };
		const dateKey = date.toDateString();
		if (updatedDays[dateKey] && updatedDays[dateKey].includes(id)) {
			return;
		}
		updatedDays[dateKey] = [...(updatedDays[dateKey] || []), id];

		context.setLocalHabitsData({
			habits: localHabits,
			days: updatedDays,
		});
	};

	const markAsIncomplete = (id: number, date: Date) => {
		const updatedDays = { ...localDays };
		const dateKey = date.toDateString();
		if (updatedDays[dateKey] && !updatedDays[dateKey].includes(id)) {
			return;
		}
		updatedDays[dateKey] = updatedDays[dateKey].filter(habitId => habitId !== id);

		context.setLocalHabitsData({
			habits: localHabits,
			days: updatedDays,
		});
	};

	return {
		habits: localHabits,
		days: localDays,
		addHabit,
		removeHabit,
		markAsComplete,
		markAsIncomplete,
		isFetching: context.isFetching,
	};
};
