const express = require('express');
const { signup, signin, signout } = require('../controllers/auth');
const { userById } = require('../controllers/controlleruser');
const { userSignupValidator } = require('../validators/validatorpost')

const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

//any route containing :userId, the app will first execute userById()
router.param("userId", userById )

module.exports = router;