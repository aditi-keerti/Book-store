const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String!
    rentPrice: Float!
    buyPrice: Float!
    status: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: String!
    booksOwned: [Book]
    booksRented: [Book]
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input BookInput {
    title: String!
    author: String!
    description: String!
    rentPrice: Float!
    buyPrice: Float!
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
    role: String
  }

  input EditUserInput {
    username: String
    email: String
    password: String
  }

  input EditBookInput {
    title: String
    author: String
    description: String
    rentPrice: Float
    buyPrice: Float
    status: String
  }

  type Query {
    books: [Book]!
    users: [User]!
  }
  
  type Mutation {
    addBook(bookInput: BookInput): Book!
    deleteBook(id: ID!): Book!
    updateBook(id: ID!, edits: EditBookInput!): Book!
    buyBook(bookId: ID!): Book!
    rentBook(bookId: ID!): Book!
    returnBook(bookId: ID!): Book!

    register(userInput: UserInput!): User!
    login(email: String!, password: String!): AuthPayload!
    logout: String!
  }
`;

module.exports = { typeDefs };
