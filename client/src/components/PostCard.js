import React from 'react';
import { Link } from 'react-router-dom';
import {
  Image, Card, Icon, Label, Button
} from 'semantic-ui-react';
import moment from 'moment';

const PostCard = ({ post }) => {
  const { body, createdAt, id, username, likeCount, commentCount, likes } = post;

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          as="div"
          labelPosition="right"
          onClick={() => console.log('Like on post')}
        >
          <Button basic color="teal">
            <Icon name="heart" />
          </Button>
          <Label basic color="teal" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button
          as="div"
          labelPosition="right"
          onClick={() => console.log('Comment on post')}
        >
          <Button basic color="teal">
            <Icon name="comments" />
          </Button>
          <Label basic color="teal" pointing="left">
            {commentCount}
          </Label>
        </Button>
        {/*user && user.username === username && (
          <DeleteButton postId={id} callback={deletePostCallback} />
        )*/}
      </Card.Content>
    </Card>
  );
}

export default PostCard;