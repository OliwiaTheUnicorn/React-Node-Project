
exports.createPostValidator = (req, res, next) => {

    console.log(req)

    //title validator
    req.check('title', 'Please write a title').notEmpty()
    req.check('title', 'Title should contain between 2-250 characters.').isLength({
        min: 1,
        max: 250
    });
    
    //content body validator
    req.check('body', 'Please write a post content').notEmpty();
    req.check('body', 'Content of post should contain between 1-10,000 characters').isLength({
        min: 1,
        max: 10000
    });

    // check for errors
    const errors = req.validationErrors()
    // if error, show as they appear
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware
    next();
};


// User signup validator 


exports.userSignupValidator = (req, res, next) => {
    // check for name - is not null and between 2-30 char 
    req.check("name", "Name cannot be empty").notEmpty();
    //check for email,  email format with @
    req.check("email", "Email should be email format")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must be email format")
    // check for password, not empty, minimum length, and contains digit
    req.check("password", "Password is required").notEmpty();
    req.check("password")
    .isLength({min: 5})
    .withMessage("Password must be at least 5 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one digit")
    //check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
        if (errors) {
            const firstError = errors.map(error => error.msg)[0];
            return res.status(400).json({ error: firstError });
        }
        // proceed to next middleware
        next();
}