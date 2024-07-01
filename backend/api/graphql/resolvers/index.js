const { GraphQLError } = require('graphql');
const User = require('../../models/User');
const Habit = require('../../models/Habit');
const UserService = require('../../services/user.service');
const HabitService = require('../../services/habit.service');

const resolvers = {
  Query: {
    getUser: async (_, { id }, context) => {
      if (!id) {
        return null;
      }

      if (!context.userId) {
        throw new GraphQLError('You must be authenticated', {
          extensions: { code: 'NOT_AUTHENTICATED_ERROR' },
        });
      }
      if (context.userId !== id) {
        throw new GraphQLError('Unauthorized', {
          extensions: { code: 'UNAUTHORIZED_ERROR' },
        });
      }

      const user = await User.findById(id);
      if (!user) {
        throw new GraphQLError('User not found', {
          extensions: { code: 'USER_NOT_FOUND_ERROR' },
        });
      }

      const habits = (await Habit.find({ user: id })) || [];

      return {
        ...user.toObject(),
        habits: habits.map((habit) => ({
          id: habit._id,
          description: habit.description,
          completedDates: habit.completedDates,
          doneToday: habit.doneToday,
        })),
      };
    },
  },
  Mutation: {
    signup: async (_, { email, name, password }) => {
      try {
        const user = await UserService.createUser({ email, name, password });
        return { user };
      } catch (error) {
        throw new GraphQLError('Error creating new user', {
          extensions: { code: 'USER_CREATION_ERROR', exception: error },
        });
      }
    },
    login: async (_, { email, password }) => {
      try {
        const { user, token } = await UserService.login({ email, password });
        return { user, jwt: token };
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: 'LOGIN_ERROR', exception: error.message },
        });
      }
    },
    addNewHabit: async (_, { description }, context) => {
      try {
        if (!context.userId) {
          throw new GraphQLError('You must be authenticated', {
            extensions: { code: 'NOT_AUTHENTICATED_ERROR' },
          });
        }

        const habit = await HabitService.addNewHabit({
          description,
          userId: context.userId,
        });

        return habit;
      } catch (error) {
        throw new GraphQLError('Error creating new habit', {
          extensions: { code: 'HABIT_CREATION_ERROR', exception: error.message },
        });
      }
    },
    updateHabit: async (_, { id }, context) => {
      try {
        if (!context.userId) {
          throw new GraphQLError('You must be authenticated', {
            extensions: { code: 'NOT_AUTHENTICATED_ERROR' },
          });
        }

        return await HabitService.updateHabit({ habitId: id });
      } catch (error) {
        throw new GraphQLError('Error updating habit', {
          extensions: { code: 'HABIT_UPDATE_ERROR', exception: error },
        });
      }
    },
  },
};

module.exports = resolvers;
