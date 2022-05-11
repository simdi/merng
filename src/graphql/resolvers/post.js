import Post from '../../models/Post';

export const postQuery = {
  getPosts: async() => {
    try {
      const posts = await Post.find();
      return posts;
    } catch (error) {
      throw new Error(error);
    }
  }
};