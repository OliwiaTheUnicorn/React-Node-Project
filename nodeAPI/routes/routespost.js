const express = require('express');
const {getPosts, createPost} = require('../controllers/controllerspost');
const { requireSignin } = require('../controllers/auth');
const { createPostValidator} = require('../validators/validatorpost')

const router = express.Router();

router.get('/', requireSignin, getPosts);
router.post('/post', createPostValidator, createPost);

module.exports = router;