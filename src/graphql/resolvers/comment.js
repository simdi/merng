import { UserInputError } from 'apollo-server';

import Post from '../../models/Post';
import checkAuthHeader from '../../utils/check-auth';

export const commentMutation = {
  createComment: async(_, { postId, body }, context) => {
    const { username } = checkAuthHeader(context);
    if (body.trim() === '') {
      throw new UserInputError('Empty comment', {
        errors: {
          body: 'Comment body must not be empty'
        }
      })
    }
    try {
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });

        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found');
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteComment: async(_, { postId, commentId }, context) => {
    const { username } = checkAuthHeader(context);

    try {
      const post = await Post.findById(postId);
      if (post) {
        // Find the index of the comment in the comments array
        const commentIndex = post.comments.findIndex(c => c.id === commentId);

        if (commentIndex) {
          
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError('Post not found');
      }
    } catch (error) {
      throw new Error(error);
    }
  }
};