import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { PubSub } from 'graphql-subscriptions';
import { mongoose } from 'mongoose';

import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

const PORT = 8000;
const mongoConnection = process.env.MONGO_CONNECTION;

const pubsub = new PubSub();

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose.connect(mongoConnection, { useNewUrlParser: true }).then(() => {
  console.log('MongoDB connected');
  return apollo.listen({ port: PORT }, () => {
    console.log(`server ready at http://localhost:${PORT}${apollo.graphqlPath}`)
    console.log(`Subscriptions ready at ws://localhost:${PORT}${apollo.subscriptions}`)
  });
}).then(res => {
  console.log(`Server running at ${res.url}`);
}).catch(err => {
  console.log({ error: err });
});
