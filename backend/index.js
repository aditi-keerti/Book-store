const express = require('express');
const { ApolloServer, gql } = require("apollo-server-express");
const { Connection } = require('./db');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');

const app = express();
app.use(express.json());

// GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ user: req.user })
});

async function startServer() {
  try {
    await server.start(); // Ensure server is started before applying middleware
    server.applyMiddleware({ app });

    app.get("/", (req, res) => {
      res.send("Home Page");
    });

    await Connection;
    console.log("Connected to db");

    app.listen(8080, () => {
      console.log("Server running at port 8080");
    });
  } catch (err) {
    console.error("Internal Server Error:", err);
  }
}

startServer();
