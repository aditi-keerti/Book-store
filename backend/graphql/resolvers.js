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
    users: async (parent, args, context) => {
      // Check if the authenticated user has the admin role
      if (context.user && context.user.role === 'admin') {
        // Allow admins to see user details
        try {
          // Fetch users from UserModel
          const users = await UserModel.find();
          return users;
        } catch (error) {
          throw new Error('Error fetching users: ' + error.message);
        }
      } else {
        // If not an admin, restrict access
        throw new Error('Unauthorized access: Only administrators can view user details.');
      }
    }
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
      const { title, author, description,rentPrice,buyPrice } = bookInput;
      const newBook = new BookModel({
        title,
        author,
        description,
        rentPrice,
        buyPrice,
        owner:user
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
      buyBook: async (_, { bookId }, { user }) => {
        // Check if user is authorized to buy a book (optional)
        if (user.role !== 'user') {
          throw new Error('Only users can buy books');
        }
      
        // Find the book by ID
        const book = await BookModel.findById(bookId);
      
        // Check if the book is available
        if (book.status !== 'Available') {
          throw new Error('This book is not available for purchase.');
          // Book is not available for purchase
        }
        
        // Update the status of the book to 'sold'
        await BookModel.findByIdAndUpdate(bookId, { status: 'sold' });
      
        // Add the book to the user's 'booksOwned' array
        user.booksOwned.push(bookId);
        await user.save();
      
        return book;
      }
      ,
      rentBook: async (_, { bookId }, { user }) => {
            // Check if user is authorized to rent a book (optional)
            if (user.role !== 'user') {
              throw new Error('Only users can rent books');
            }
            const book = await BookModel.findById(bookId);
            if (book.status !== 'Available') {
              throw new Error('This book is not available for purchase.');
              // Book is not available for purchase
            }
            // Find the book by ID and update its status to 'rented'
            await BookModel.findByIdAndUpdate(bookId, { status: 'rented' }, { new: true });
      
            // Add the book to the user's 'booksRented' array
            user.booksRented.push(bookId);
            await user.save();
      
            return book;
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
