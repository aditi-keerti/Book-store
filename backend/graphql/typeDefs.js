const { ApolloServer, gql } = require("apollo-server-express");


const typeDefs=gql`
type Book {
  id: ID!
  title: String!
  author: String!
  description: String!
}

type User {
  id: ID!
  username: String!
  email: String!
  password: String!
  role: String!
}

type AuthPayload {
  token: String!
  user: User!
}

input BookInput {
  title: String!
  author: String!
  description: String!
}

input UserInput {
  username: String!
  email: String!
  password: String!
  role: String
}

type Query {
  books: [Book]!
  users: [User]!
}

type Mutation {
  addBook(bookInput: BookInput): Book!
  deleteBook(id:ID!):Book!
  updateBook(id:ID!,edits:EditBookInput!):Book

  register(userInput: UserInput!): User!
  login(email: String!, password: String!): AuthPayload!
  logout: Boolean!
}

# type Mutation{
   
#     # books k mutations
#     addBook(book:AddBookInput):Book
#     deleteBook(id:ID!):[Book]
#     updateBook(id:ID!,edits:EditBookInput!):Book
# }
input UserInput{
    username:String!
    email:String!
    password:String!
    role:String
}
input EditUserInput{
    username:String
    email:String
    password:String
}
input BookInput{
    title:String!
    author:String!
    description:String!
}
input EditBookInput{
    bookname:String
    author:String
    genre:String
}
`

module.exports={typeDefs}