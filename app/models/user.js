// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var bracketSchema =  new mongoose.Schema({
        round1a      : String,
        round1b      : String,
        round1c      : String,
        round1d      : String,
        round2a      : String,
        round2b      : String,
        round3a      : String,
});

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        brackets     : [bracketSchema]
        //{type: mongoose.Schema.Types.ObjectId, ref: 'bracket'}
    },
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
