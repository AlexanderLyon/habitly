export type Habit = {
	id: number;
	title: string;
	description?: string;
	dateCreated: Date;
};

export type TrackedDays = {
	[date: string]: number[]; // Habit IDs
};

export interface LocalHabitsData {
	habits: Habit[];
	days: TrackedDays;
}
