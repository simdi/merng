import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { mongoose } from 'mongoose';

import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

const PORT = 8000;
const mongoConnection = process.env.MONGO_CONNECTION;

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
