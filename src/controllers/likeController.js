const Like = require("../models/likeModel");
const Post = require("../models/postModel");
exports.createLike = async (req, res) => {
  try {
    const { postId, user } = req.body;
    if (!postId && !user) {
      return res.status(400).json({
        status: "fail",
        message: "User and Post ID are required",
      });
    }
    const likeData = new Like({
      postId,
      user,
    });
    
    const savedLike = await likeData.save();
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { likes: savedLike._id },
      },
      { new: true }
    ).populate("likes");
    res.status(200).json({
      status: "success",
      message: "Data Updated Successfully",
      data: {
        data: updatedPost,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.unlikePost = async (req,res) => {
    try {
        const { postId, likeId } = req.body;
        if (!postId || !likeId) {
            return res.status(400).json({
                status: 'fail',
                message: 'Post ID and Like ID are required',
            });
        }

        // Find the like document to remove
        const likeToRemove = await Like.findOneAndDelete({ postId: postId, _id: likeId });

        if (!likeToRemove) {
            return res.status(404).json({
                status: 'fail',
                message: 'Like not found',
            });
        }

        // Update the post to remove the like reference
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $pull: { likes: likeToRemove._id } },
            { new: true }
        ).populate('likes');

        res.status(200).json({
            status: 'success',
            message: 'Like removed successfully',
            data: {
                post: updatedPost,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
        
    }
}