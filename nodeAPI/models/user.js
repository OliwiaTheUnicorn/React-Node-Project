const mongoose = require('mongoose');
// const uuidv1 = require('uuid/v1');
//const { v1: uuidv1 } = require('uuid');
const { uuid } = require('uuidv4');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        trim: true,
        required: true
    },

    hashed_password: {
        type: String,
        required: true
    },

    salt: String,
    created: {
        type:Date,
        default: Date.now
    },
    updated: Date

})

//virtual field for hashing password

userSchema
.virtual('password')
.set(function(password) {
    // create temporary variable called _password
    this._password = password;
    // generate a timestamp
    this.salt = uuid();
    //encrypt password
    this.hashed_password = this.encryptedPassword(password);

})
.get(function() {
    return this._password;
})

// method for encrypting password inbuild from node.js, and authenticate function  used in signin

userSchema.methods = {

    //signin method in user model 

    authenticate: function (plainText) {
        return this.encryptedPassword(plainText) === this.hashed_password
    },

    encryptedPassword: function(password) {
        if(!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                               .update(password)
                               .digest('hex');
        } catch(err) {
            return ""
        }
    }
}

module.exports = mongoose.model("User", userSchema)