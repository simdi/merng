import React from 'react';
import {
  Grid, Image, Loader,
} from 'semantic-ui-react';

import usePosts from '../hooks/usePosts';
import PostCard from './PostCard';

const Home = () => {
  const { loading, posts } = usePosts();

  console.log({ posts });

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {
          loading ? (
            <Loader />
          ) : (
            posts && posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard key={post.id} post={post} />
              </Grid.Column>
            ))
          )
        }
      </Grid.Row>
    </Grid>
  );
};

export default Home;