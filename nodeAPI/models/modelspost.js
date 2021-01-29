const mongoose = require('mongoose');

//Post Schema, requiring certain qualities of post 

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        minlength: 2,
        maxlength: 250
    },

    body: {
        type: String,
        required: "Content is required",
        minlength: 2,
        maxlength: 10000
    }
});

module.exports = mongoose.model("Post", postSchema)

// mongooose model is a method creating a model