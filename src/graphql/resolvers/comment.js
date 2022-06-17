import {
  AuthenticationError, UserInputError,
} from 'apollo-server';

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

        if (post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        }
        throw new AuthenticationError('Action not allowed');
      } else {
        throw new UserInputError('Post not found');
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  likePost: async(_, { postId }, context) => {
    const { username } = checkAuthHeader(context);

    try {
      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find(like => like.username === username)) {
          // Post already liked, unlike it
          post.likes = post.like.filter(like => like.username !== username) ;
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          })
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