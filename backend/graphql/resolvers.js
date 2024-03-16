// const { ApolloServer, gql } = require("apollo-server-express");
const { UserModel } = require("../models/users.model");
const { BookModel } = require("../models/books.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const cookieParser = require('cookie-parser');

const resolvers = {
  Query: {
    async books() {
      return await BookModel.find();
    },
    async users() {await UserModel.find()},
  },
  Mutation: {
    async addBook(_, { bookInput},{user}) {
      // Check if user is logged in
      if (!user) {
        throw new Error("Unauthorized: User not logged in");
      }

      // Check if user has admin role
      if (user.role !== "admin") {
        throw new Error("Unauthorized: User is not an admin");
      }

      // User is logged in and has admin role, so add book
      const { title, author, description } = bookInput;
      const newBook = new BookModel({
        title,
        author,
        description,
      });
      const savedBook = await newBook.save();
      return savedBook;
    },

    deleteBook: async (_, { id }, { user }) => {
        // Check if user is logged in
        if (!user) {
          throw new Error("Unauthorized: User not logged in");
        }
  
        // Check if user is admin
        if (user.role !== "admin") {
          throw new Error("Unauthorized: User is not an admin");
        }
  
        // User is logged in and is an admin, so delete book
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if (!deletedBook) {
          throw new Error("Book not found");
        }
  
        return deletedBook;
      },
      updateBook: async (_, { id, edits }, { user }) => {
        // Check if user is logged in
        if (!user) {
          throw new Error("Unauthorized: User not logged in");
        }
  
        // Check if user is admin
        if (user.role !== "admin") {
          throw new Error("Unauthorized: User is not an admin");
        }
  
        // Find the book by ID
        const existingBook = await BookModel.findById(id);
        if (!existingBook) {
          throw new Error("Book not found");
        }
  
        // Update the book with the provided edits
        Object.assign(existingBook, edits);
        const updatedBook = await existingBook.save();
  
        return updatedBook;
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
    logout: (_, __, { user }) => {
        // Check if the user is authenticated
        if (!user) {
            throw new Error("Unauthorized: User Already Logged Out");
        }
        
        // Perform any necessary logout actions (e.g., clearing tokens)
        // Here, you might clear the token from local storage or perform any other cleanup
    
        // Return a message indicating successful logout
        return `User ${user.username} has been logged out`;
    },
  },
};

// Helper function to generate JWT token
const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.id
    },
    "masai",
    { expiresIn: "1h" } // Token expiration time
  );
  return token;
};

// module.exports = resolvers;

module.exports = { resolvers };
