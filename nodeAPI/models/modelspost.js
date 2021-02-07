const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

//Post Schema, requiring certain qualities of post 

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        minlength: 1,
        maxlength: 250
    },

    body: {
        type: String,
        required: "Content is required",
        minlength: 1,
        maxlength: 10000
    },

    photo: {
        type: Buffer,
        contentType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Post", postSchema)

// mongooose model is a method creating a model