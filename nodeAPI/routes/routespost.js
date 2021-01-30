const express = require('express');
const {getPosts, createPost} = require('../controllers/controllerspost');
const validator = require('../validators/validatorpost')

const router = express.Router();

router.get('/', getPosts);
router.post('/post', validator.createPostValidator, createPost);

module.exports = router;