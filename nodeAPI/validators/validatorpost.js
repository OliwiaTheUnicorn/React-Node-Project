
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