import { postMutation, postQuery } from './post';
import { userQuery, userMutation } from './user';
import { commentQuery, commentMutation } from './comment';

const resolvers = {
  Query: {
    ...postQuery,
    ...userQuery,
    ...commentQuery,
  },
  Mutation: {
    ...userMutation,
    ...postMutation,
    ...commentMutation,
  },
};

module.exports = resolvers;