import Post from '../../models/Post';

export const postQuery = {
  getPosts: async() => {
    try {
      const posts = await Post.find();
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