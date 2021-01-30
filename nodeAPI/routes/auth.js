const express = require('express');
const {signup } = require('../controllers/auth');
//const validator = require('../validators/validatorpost')

const router = express.Router();

router.post('/signup', signup);

module.exports = router;