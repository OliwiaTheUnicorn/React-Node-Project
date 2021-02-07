const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require("../models/user");
const expressJwt = require('express-jwt');
const { userSignupValidator } = require('../validators/validatorpost');


//SIGNUP

exports.signup = async (req, res) => {
    //check if user exists based on email adress using async/await
    const userExists = await User.findOne({ email: req.body.email });
    if(userExists)
        return res.status(403).json({
        error: "Email is already in use."
    });
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: "You signed up successfully. Please login"});
};


//SIGNIN 

exports.signin = (req,res) => {
    // find the user based on email
        const {email, password} = req.body
        User.findOne({email}, (err, user) => {
            // if err or no user
            if(err || !user) {
                return res.status(401).json({
                    error: "User with that email doesn't exist. Please signup."
                })
            }
            //if user is found, and email and password matches
            //create authenticate method in model and use here

            if(!user.authenticate(password)) {
                return res.status(401).json({
                    error: "Email or password doesn't match"
                })
            }

            // generate token and cookie
            // generate a token with user id and secret
            // persist token as 't' in cookie with expiry date
            const token = jwt.sign({_id: user._id}, process.env.JTW_SECRET);
            res.cookie("t", token, {expire: new Date() + 9999})
           // return response with user and token to front-end client
           const {_id, name, email} = user
           return res.json({token, user: {_id, email, name}}); 
        });
};

// SIGNOUT

exports.signout = (req, res) => {
    res.clearCookie("t")
    return res.json({message: "You signed out succesfully."});
};

// making post private

exports.requireSignin = expressJwt({
    // if token is valid, express jwt appends verified users id 
    // in an auth key to the request object
    secret: process.env.JTW_SECRET, algorithms: ['HS256'],
    userProperty: "auth"
});

