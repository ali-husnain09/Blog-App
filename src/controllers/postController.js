const post = require('../models/postModel');

exports.createPost = async (req, res) => {
    try {
        const {title,content} = req.body;
        const newPost = await post.create({title, content});
        res.status(201).json({
            status: 'success',
            data: {
                post: newPost
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

exports.getAllpost = async (req,res) => {
    try {
        const posts = await post.find({});
        res.status(200).json({
            status: 'sucess',
            data : {
                posts : posts
            }
        })
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message : error.message,
        });
    }
}
exports.getPostById = async (req, res) => {
    try {
        const postId = req.params.id;
        const singlePost = await post.findById(postId);
        if (!singlePost) {
            return res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                post: singlePost
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}
