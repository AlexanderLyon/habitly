import { graphQLSchemaExtension } from '@keystone-next/keystone/schema';
import { addNewHabit, updateHabit } from './habitMutations';

// For VS Code syntax highlighting
const graphql = String.raw;

export const extendGraphqlSchema = graphQLSchemaExtension({
  typeDefs: graphql`
    type Mutation {
      addNewHabit(description: String!): Habit
      updateHabit(id: ID!): Habit
    }
  `,
  resolvers: {
    Mutation: {
      addNewHabit,
      updateHabit,
    },
  },
});
