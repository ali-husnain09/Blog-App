const comment = require('../models/commentModel');

exports.createComment = async (req, res) => {
    try {
        const { postId, user, content } = req.body;
        const commentData = new comment({ 
            postId,
            user,
            content
        });
        await commentData.save();
        if (!postId || !user || !content) {
            return res.status(400).json({
                status: 'fail',
                message: 'Post ID, user, and content are required'
            });
        }
        res.status(200).json({
            message: 'Comment created successfully',
            data: {
                comment: commentData
            },
            sucess: true,

        });
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
        
    }
}