const post = require('../models/postModel');
const likes = require('../models/likeModel');
const comment = require('../models/commentModel');
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
        // Fetch all posts and populate comments and likes
        // Using await to ensure the database operation completes before proceeding
        const posts = await post.find({}).populate('comments').populate('likes');

        // Check if posts are not found and return a 404 status
        if (posts.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No posts found'
            });
        }
        
        // If posts are found, return them with a 200 status
        // Using res.status(200).json to send a successful response
        res.status(200).json({
            status: 'success',
            data: {
                posts: posts
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
    } catch (error) {   // Catch any errors that occur during the process
        // If an error occurs, send a 400 status with the error message
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}
