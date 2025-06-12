const mongoose = require('mongoose');
// Importing mongoose to create a schema for the Post model

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt:{
    type: Date,
    default: Date.now(),
  },
  updatedAT:{
    type:Date,
    default: Date.now(),
  },
});
const Post = mongoose.model('Post', postSchema);
module.exports = Post;