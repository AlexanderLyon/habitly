const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const Auth = require('../services/auth.service');

const createApolloServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        ...req,
        userId: req ? Auth.getUserId({ req }) : null,
      };
    },
  });
};

module.exports = createApolloServer;
