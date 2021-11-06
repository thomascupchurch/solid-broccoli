const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
  }

  type Query {
    books: [Book]
    book(title: String!): Book
  }

  type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      saveBook([authors]: String!, description: STRING!, title: STRING!, bookId: String!, image: String!, link: String!): User
      removeBook(bookId: String!): User
  }

  type User {
      _id: ID
      username: String
      email: String
      bookCount: Int
      savedBooks: [Book]
  }

  type Book {
      bookId: String
      authors: [String]
      description: String
      title: String
      image: String
      link: String
  }

  type Auth {
      token: ID!
      user: User
  }
`;
