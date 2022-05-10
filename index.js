import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { gql } from 'graphql-tag';
import { mongoose } from 'mongoose';

import Posts from './models/Post';

const PORT = 8000;
const mongoConnection = process.env.MONGO_CONNECTION;

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    getPosts: async() => {
      try {
        const posts = await Posts.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose.connect(mongoConnection, { useNewUrlParser: true }).then(() => {
  console.log('MongoDB connected');
  return server.listen({ port: PORT });
}).then(res => {
  console.log(`Server running at ${res.url}`);
}).catch(err => {
  console.log({ error: err });
});
