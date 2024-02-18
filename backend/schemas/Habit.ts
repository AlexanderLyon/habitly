import { integer, select, text, relationship, virtual } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';
import { isSignedIn, rules } from '../access';

export const Habit = list({
  access: {
    create: isSignedIn,
    read: rules.canManageHabits,
    update: rules.canManageHabits,
    delete: rules.canManageHabits,
  },
  ui: {
    hideCreate: false,
    hideDelete: false,
  },
  fields: {
    description: text({ isRequired: true }),
    completedDates: text({ isRequired: false }), // comma separated list of dates completed
    doneToday: virtual({
      graphQLReturnType: 'Boolean',
      resolver(item) {
        const today = new Date().toISOString().split('T')[0];
        const completedDates = item.completedDates || '';
        return completedDates.split(',').includes(today);
      },
    }),
    user: relationship({ ref: 'User.habits' }),
  },
});
