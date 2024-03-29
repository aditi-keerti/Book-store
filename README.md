# Book Management System

Welcome to the Book Management System, a powerful solution for efficiently managing books, borrowing, and purchasing. This API provides administrators with comprehensive tools for book management while enabling users to seamlessly borrow, buy, and explore books. Built using Node.js and Express.js, the API leverages the power of Apollo Server Express for GraphQL implementation, allowing for efficient data retrieval and manipulation. With MongoDB as the backend NoSQL database, data storage and management are handled seamlessly, ensuring scalability and performance. Explore the endless possibilities of book management with our intuitive API.
  

## Features
- **Admin Privileges**: Administrators have full control over managing books within the system.
- **User Interactions**: Users can borrow books, buy books, and access the available library.

## Endpoints

### GraphQL Routes Documentation
This document provides an overview of the GraphQL routes available in the Book Management System application. GraphQL is a query language for APIs that enables clients to request only the data they need, allowing for more efficient and flexible data retrieval.

#### Getting Started
To interact with the GraphQL API, you can use tools like Postman or GraphQL Playground. The GraphQL endpoint is located at `/graphql`. Ensure that the server is running before making requests to the GraphQL API.

#### Authentication
Some GraphQL routes require authentication. You need to include an Authorization header with a valid access token to access these routes. The access token should be obtained by logging in using the `loginUser` mutation.

#### Available Routes

**Queries**

- **books**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Retrieves a list of all books.
  - Authorization: Required
  - Example Query:
    ```graphql
    query {
      books {
        id
        title
        author
        description
        rentPrice
        buyPrice
        status
      }
    }
    ```

- **users**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Retrieves a list of all users.
  - Authorization: Required
  - Example Query:
    ```graphql
    query {
      users {
        id
        username
        email
        password
        role
        booksOwned {
          id
          title
          author
        }
        booksRented {
          id
          title
          author
        }
      }
    }
    ```

**Mutations**

- **addBook**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Adds a new book to the system.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      addBook(bookInput: {
        title: "Book Title",
        author: "Author Name",
        description: "Book Description",
        rentPrice: 5.99,
        buyPrice: 19.99
      }) {
        id
        title
        author
        description
        rentPrice
        buyPrice
        status
      }
    }
    ```

- **deleteBook**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Deletes a book from the system.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      deleteBook(id: "book_id_here") {
        id
        title
        author
      }
    }
    ```

- **updateBook**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Updates a book in the system.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      updateBook(id: "book_id_here", edits: {
        title: "New Book Title",
        author: "New Author Name",
        description: "New Book Description",
        rentPrice: 6.99,
        buyPrice: 24.99,
        status: "Available"
      }) {
        id
        title
        author
        description
        rentPrice
        buyPrice
        status
      }
    }
    ```

- **buyBook**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Allows a user to buy a book.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      buyBook(bookId: "book_id_here") {
        id
        title
        author
        description
        rentPrice
        buyPrice
        status
      }
    }
    ```

- **rentBook**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Allows a user to rent a book.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      rentBook(bookId: "book_id_here") {
        id
        title
        author
        description
        rentPrice
        buyPrice
        status
      }
    }
    ```

- **returnBook**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Allows a user to return a rented book.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      returnBook(bookId: "book_id_here") {
        id
        title
        author
        description
        rentPrice
        buyPrice
        status
      }
    }
    ```

- **register**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Registers a new user.
  - Authorization: Not required
  - Example Mutation:
    ```graphql
    mutation {
      register(userInput: {
        username: "JohnDoe",
        email: "john@example.com",
        password: "password",
        role: "reader"
      }) {
        id
        username
        email
        role
      }
    }
    ```

- **login**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Logs in a user and generates access tokens.
  - Authorization: Not required
  - Example Mutation:
    ```graphql
    mutation {
      login(email: "john@example.com", password: "password") {
        token
        user {
          id
          username
          email
          role
        }
      }
    }
    ```

- **logout**
  - Endpoint: `/graphql`
  - Method: `POST`
  - Description: Logs out a user by blacklisting access tokens.
  - Authorization: Required
  - Example Mutation:
    ```graphql
    mutation {
      logout
    }
    ```



## Usage

- **Register as a User**: Start by registering as a user to gain access to the library functionalities.
- **Explore Available Books**: Browse through the library to discover the wide range of books available.
- **Borrow or Buy Books**: Choose the desired book and opt to either borrow it or buy it, based on your preference and availability.
- **Administrator Actions**: If you're an administrator, log in to access advanced features like adding, updating, or deleting books from the system and only a admin can create another admin.

## Technology Stack

- **Node.js**: Backend JavaScript runtime.
- **Express.js**: Web application framework for Node.js.
- **Apollo Server Express**: GraphQL server for Node.js.
- **MongoDB**: NoSQL database for data storage.
- **GraphQL**: Query language and runtime for APIs.

### Postman Collection

Explore the GraphQL Operations with our Postman collection:
[Book Management System API Collection](https://documenter.getpostman.com/view/31955255/2sA2xnyAUf)

### Deployment

Check out the deployed Book Management System:
[Deployed Application](https://bookstore-qcfg.onrender.com)

### User Credentials

- **email**: shraddha@gmail.com
- **password**: aditi

### Admin Credentials

- **email**: aditi@gmail.com
- **password**: aditi


Enjoy seamless book management and access with the Book Management System API today!
