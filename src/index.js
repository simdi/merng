import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { PubSub } from 'graphql-subscriptions';
import { mongoose } from 'mongoose';

import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

const PORT = 8000;
const mongoConnection = process.env.MONGO_CONNECTION;

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose.connect(mongoConnection, { useNewUrlParser: true }).then(() => {
  console.log('MongoDB connected');
  return server.listen({ port: PORT }, () => {
    console.log(`server ready at http://localhost:${PORT}${server.graphqlPath}`)
    console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
  });
}).then(res => {
  console.log(`Server running at ${res.url}`);
}).catch(err => {
  console.log({ error: err });
});
