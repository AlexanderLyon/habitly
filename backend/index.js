const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./api/config/db');
const createApolloServer = require('./api/graphql/schema');

dotenv.config();
connectDB();

const app = express();

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));

const server = createApolloServer();

server.start().then((res) => {
  server.applyMiddleware({ app, path: '/', cors: false });
  const PORT = process.env.PORT || 4000;

  app.listen({ port: PORT }, () =>
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`)
  );
});

module.exports = app; // Export Express app for Vercel
