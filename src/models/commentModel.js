const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const commentSchema = Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Comment = model('Comment',commentSchema);
module.exports = Comment;