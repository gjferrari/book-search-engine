const typeDefs = `#graphql
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type addedBook {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Query {
    me: [User]
  }

  type Mutation {
    {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String], description: String!, title: String!, image: String!, link: String!, bookId: String!, userId: ID!): User
        deleteBook(bookId: String!): User
      }
`;

module.exports = typeDefs;

//By default, all value types in GraphQL can result in a null value. If a value type includes an exclamation point, it means that value cannot be null.
