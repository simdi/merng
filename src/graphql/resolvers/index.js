import { postMutation, postQuery, postSubscription } from './post';
import { userQuery, userMutation } from './user';
import { commentQuery, commentMutation } from './comment';

const resolvers = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
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
  Subscription: {
    ...postSubscription
  }
};

module.exports = resolvers;