import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../graphql/Queries';

const usePosts = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data) {
      const { getPosts: posts } = data;
      setPosts(posts);
    }

  }, [data]);

  return {
    posts,
    loading,
  };
};

export default usePosts;