const User = require("../models/user");

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


