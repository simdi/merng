import { AuthenticationError } from 'apollo-server';
import Post from '../../models/Post';
import checkAuthHeader from '../../utils/check-auth';

export const postQuery = {
  getPosts: async() => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  },
  getPost: async(_, { postId }) => {
    try {
      const post = await Post.findById(postId);
      if (post) {
        return post;
      } else {
        throw new Error('Post not found');
      }
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const postMutation = {
  createPost: async(_, { body }, context) => {
    const user = checkAuthHeader(context);

    const newPost = new Post({
      body,
      user: user.id,
      username: user.username,
      createdAt: new Date().toISOString(),
    });

    const post = await newPost.save();
    return post;
  },
  deletePost: async(_, { postId }, context) => {
    const user = checkAuthHeader(context);

    try {
      const post = await Post.findById(postId);

      if (user.username === post.username) {
        await post.delete();
        return 'Post deleted successfully!';
      }
      throw new AuthenticationError('Action not allowed');
    } catch (error) {
      throw new Error(error);
    }
  }
}