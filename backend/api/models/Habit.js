const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  completedDates: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

HabitSchema.virtual('doneToday').get(function () {
  const today = new Date().toISOString().split('T')[0];
  const completedDates = this.completedDates || '';
  return completedDates.split(',').includes(today);
});

HabitSchema.set('toJSON', { virtuals: true });
HabitSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Habit', HabitSchema);
