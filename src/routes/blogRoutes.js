const express = require('express');
const router = express.Router();




const { getAllpost, createPost,getPostById } = require('../controllers/postController');
router.get('/getpost', getAllpost);
router.post('/createpost',createPost);
router.get('/getpost/:id', getPostById);
module.exports = router;