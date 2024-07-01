const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID
    name: String
    email: String
    password: String
    habits: [Habit]
  }

  type Error {
    message: String
  }

  type Signup {
    user: User
    errors: [Error]
  }

  type Login {
    jwt: ID
    user: User
    errors: [Error]
  }

  type Habit {
    id: ID!
    description: String!
    completedDates: String
    doneToday: Boolean
    user: User
  }

  type Query {
    getUser(id: ID): User
  }

  type Mutation {
    signup(email: String!, name: String!, password: String!): Signup
    login(email: String, password: String!): Login
    addNewHabit(description: String!): Habit
    updateHabit(id: ID!): Habit
  }
`;

module.exports = typeDefs;
