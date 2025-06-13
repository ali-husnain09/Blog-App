const comment = require("../models/commentModel");
const post = require("../models/postModel");
exports.createComment = async (req, res) => {
  try {
    const { postId, user, content } = req.body;
    const commentData = new comment({
      postId,
      user,
      content,
    });
    const saveComment = await commentData.save();
    if (!postId || !user || !content) {
      return res.status(400).json({
        status: "fail",
        message: "Post ID, user, and content are required",
      });
    }

    const updatedPost = await post.findByIdAndUpdate(
      postId,
      { $push: { comments: saveComment._id } },
      { new: true, useFindAndModify: false }
    ).populate("comments");
    res.status(200).json({
      message: "Comment created successfully",
      data: {
        post: updatedPost,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
