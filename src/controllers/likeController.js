const like = require('../models/likeModel');

exports.createLike = async (req, res) => {
    try {

        const { user, postId } = req.body;
        const likeData = new like({
            user,
            postId
        })
        await likeData.save();
        if (!!user, !!postId) {
             return res.status(400).json({
                status: 'fail',
                message: 'User and Post ID are required'
            });
        }
        res.status(200).json({
            status: 'success',
            message: 'Like created successfully',
            data: {
                like: likeData
            }
        });
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
        
    }
}