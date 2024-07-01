const Habit = require('../models/Habit');

class HabitService {
  constructor() {}

  static async addNewHabit({ description, userId }) {
    const newHabit = new Habit({
      description,
      user: userId,
    });
    await newHabit.save();

    return newHabit;
  }

  static async updateHabit({ habitId }) {
    console.log('UPDATING HABIT');

    const habitToUpdate = await Habit.findOne({ _id: habitId });
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

    const newHabit = await Habit.findOneAndUpdate(
      { _id: habitId },
      { completedDates: completedDates.join(',') }
    );

    return newHabit;
  }
}

module.exports = HabitService;
