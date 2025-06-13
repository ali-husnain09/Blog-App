const express = require('express');
const router = express.Router();

const { getAllpost, createPost,getPostById } = require('../controllers/postController');
const {createComment} = require('../controllers/commentController');
const {createLike} = require('../controllers/likeController');
router.get('/getpost', getAllpost);
router.post('/createpost',createPost);
router.get('/getpost/:id', getPostById);
router.put('/createcomment',createComment);
router.post('/createlike',createLike);
module.exports = router;