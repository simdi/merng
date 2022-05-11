import { postQuery } from './post';
import { userQuery, userMutation } from './user';

const resolvers = {
  Query: {
    ...postQuery,
    ...userQuery,
  },
  Mutation: {
    ...userMutation,
  },
};

module.exports = resolvers;