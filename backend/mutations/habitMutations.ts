/* eslint-disable */
import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { Habit } from '../schemas/Habit';
import { Session } from '../types';
import { HabitCreateInput } from '../.keystone/schema-types';

const graphql = String.raw;

export async function addNewHabit(
  root: any,
  { description }: { description: string },
  context: KeystoneContext
): Promise<HabitCreateInput> {
  console.log('ADDING NEW HABIT');

  // Query the current user see if they are signed in
  const sesh = context.session as Session;

  if (!sesh.itemId) {
    throw new Error('You must be logged in to add a new habit');
  }

  // If signed in, create the new habit
  return await context.lists.Habit.createOne({
    data: {
      description: description,
      user: { connect: { id: sesh.itemId } },
    },
    resolveFields: false,
  });
}

export async function updateHabit(
  root: any,
  { id }: { id: string },
  context: KeystoneContext
): Promise<any> {
  console.log('UPDATING HABIT');

  // Query the current user see if they are signed in
  const sesh = context.session as Session;

  if (!sesh.itemId) {
    throw new Error('You must be logged in to update a habit');
  }

  // Find the selected habit to update:
  const habitToUpdate = await context.lists.Habit.findOne({
    where: { id: id },
    resolveFields: graphql`
      completedDates
    `,
  });

  if (!habitToUpdate) {
    throw new Error('Error finding habit to update');
  }

  // Today's date as YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  // If the habit has no completedDates, add today's date
  const completedDates = habitToUpdate.completedDates
    ? habitToUpdate.completedDates.split(',')
    : [];

  if (!completedDates.includes(today)) {
    completedDates.push(today);
  } else {
    completedDates.splice(completedDates.indexOf(today), 1);
  }

  // Update completedDates for specific habit:
  return await context.lists.Habit.updateOne({
    id: id,
    data: {
      completedDates: completedDates.join(','),
    },
    resolveFields: false,
  });
}
