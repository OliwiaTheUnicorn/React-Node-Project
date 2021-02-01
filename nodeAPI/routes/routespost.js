const express = require('express');
const {getPosts, createPost} = require('../controllers/controllerspost');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/controlleruser');
const { createPostValidator} = require('../validators/validatorpost')

const router = express.Router();

router.get('/', getPosts);
router.post('/post', requireSignin, createPostValidator, createPost);

//any route containing :userId, the app will first execute userById()
router.param("userId", userById )

module.exports = router;