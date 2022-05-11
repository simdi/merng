import { model, Schema } from 'mongoose';

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'users' },
  username: String,
  body: String,
  createdAt: String,
  comments: [{
    body: String,
    username: String,
    createdAt: String
  }],
  likes: [{
    username: String,
    createdAt: String
  }],
});

module.exports = model('Post', PostSchema);