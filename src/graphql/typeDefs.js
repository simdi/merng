import { gql } from 'graphql-tag';

const typeDefs = gql`
  input RegisterInput {
    username: String!
    password: String!
    email: String!
  }

  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type User {
    id: ID!
    token: String!
    email: String!
    username: String! 
    createdAt: String!
  }

  type Query {
    getPosts: [Post]
    getUsers: [User]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
  }
`;

module.exports = typeDefs;