const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const jwt = require("jsonwebtoken");
const { Connection } = require('./db');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');
const {UserModel}=require('./models/users.model')

const app = express();
app.use(express.json());
app.use(cookieParser()); // Add cookie-parser middleware

// GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({ req }) => {
    // Extract token from request headers
    const token = req.headers.authorization || "";
    let user = null;
    try {
      const decodedToken = jwt.verify(token, "masai");
      const userId = decodedToken.userId;
      user = await UserModel.findById(userId);
    } catch (error) {
      console.error("Error decoding token:", error.message);
    }
    return {user};
  }
});

async function startServer() {
  try {
    await server.start(); // Ensure server is started before applying middleware
    server.applyMiddleware({ app });

    app.get('/', (req, res) => {
      res.send('Home Page');
    });

    await Connection;
    console.log('Connected to db');

    app.listen(8080, () => {
      console.log('Server running at port 8080');
    });
  } catch (err) {
    console.error('Internal Server Error:', err);
  }
}

startServer();
