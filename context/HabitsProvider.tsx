'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { LocalHabitsData } from '@lib/types';
import { HABITS_LOCAL_STORAGE_KEY } from '@lib/constants';

interface HabitsContextType {
	localHabitsData: LocalHabitsData | undefined;
	setLocalHabitsData: React.Dispatch<React.SetStateAction<LocalHabitsData | undefined>>;
	isFetching: boolean;
}

/**
 * Save habits data to local storage
 * @param value Array of habits
 */
const saveLocalStorageValue = async (value?: LocalHabitsData): Promise<void> => {
	if (!value) {
		return;
	}
	localStorage.setItem(HABITS_LOCAL_STORAGE_KEY, JSON.stringify(value));
};

/**
 * Get habits data from local storage
 * @param value Array of habits
 */
const readLocalStorageValue = async (): Promise<LocalHabitsData | null> => {
	const savedHabits = localStorage.getItem(HABITS_LOCAL_STORAGE_KEY);
	return savedHabits ? JSON.parse(savedHabits) : null;
};

export const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const HabitsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [localHabitsData, setLocalHabitsData] = useState<LocalHabitsData | undefined>();
	const [isFetching, setIsFetching] = useState(true);

	// Read habits from local storage on mount
	useEffect(() => {
		const getHabitsData = async () => {
			const data = await readLocalStorageValue();
			if (data) {
				setLocalHabitsData(data);
			} else {
				// Set initial data:
				setLocalHabitsData({
					habits: [],
					days: {
						[new Date().toDateString()]: [],
					},
				});
			}
			setIsFetching(false);
		};

		getHabitsData();
	}, []);

	// Save data to local storage when updated
	useEffect(() => {
		const saveHabitsData = async () => {
			if (localHabitsData) {
				await saveLocalStorageValue(localHabitsData);
			}
		};

		saveHabitsData();
	}, [localHabitsData]);

	return (
		<HabitsContext.Provider value={{ localHabitsData, setLocalHabitsData, isFetching }}>
			{children}
		</HabitsContext.Provider>
	);
};
