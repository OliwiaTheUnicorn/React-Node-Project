const express = require('express');
const {getPosts, createPost} = require('../controllers/controllerspost');
const { createPostValidator} = require('../validators/validatorpost')

const router = express.Router();

router.get('/', getPosts);
router.post('/post', createPostValidator, createPost);

module.exports = router;