import { useQuery } from '@apollo/client';
import React from 'react';
import {
  Grid, Image, Loader,

} from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../graphql/Queries';

const Home = () => {
  const { loading, data: { getPosts: posts } } = useQuery(FETCH_POSTS_QUERY);

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <Grid columns={3} divided>
      <Grid.Row>
        {

        }
        <Grid.Column>
          <Image src='/images/wireframe/media-paragraph.png' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Home;