const express = require('express');
const postController = require('../controllers/controllerspost');

const router = express.Router();

router.get('/', postController.getPosts);

module.exports = router;