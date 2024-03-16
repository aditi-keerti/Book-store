// const { ApolloServer, gql } = require("apollo-server-express");
const { UserModel } = require("../models/users.model");
const { BookModel } = require("../models/books.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    async books() {
      return await BookModel.find();
    },
    users: async () => await UserModel.findAll(),
  },
  Mutation: {
    async addBook(_, { bookInput: { title, author, description } }) {
      const newBook = new BookModel({
        title: title,
        author: author,
        description: description,
      });
      const result = await newBook.save();
      console.log(result);
      return {
        id: result.id,
        ...result._doc,
      };
    },

    async deleteBook(_, { ID }) {
      await BookModel.deleteOne({ _id: ID });
    },

    // User registration
    async register(_, { userInput: { username, email, password, role } }) {
      const hashedPassword = await bcrypt.hash(password, 5); // Using 10 as salt rounds

      // Create new user with hashed password and determined role
      const newUser = new UserModel({
        username: username,
        email: email,
        password: hashedPassword,
        role,
      });

      // Save user to database
      const savedUser = await newUser.save();

      // Ensure the user object returned has a valid id
      return {
        ...savedUser.toObject(), // Convert Mongoose document to plain object
        id: savedUser._id.toString(), // Ensure id is converted to string
      };
    },
    //   User Login
    login: async (_, { email, password }) => {
      // Find user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      // Passwords match, generate JWT token
      const token = generateToken(user);

      return { token, user };
    },
  },
};

// Helper function to generate JWT token
const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    "masai",
    { expiresIn: "1h" } // Token expiration time
  );
  return token;
};

// module.exports = resolvers;

module.exports = { resolvers };
