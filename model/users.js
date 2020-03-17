const mongoose = require('mongoose');
// const reviewSchema = new mongoose.Schema({
//     stars: String,
//     review: String,
//     author: String,
//     when:  Date,
// });
const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
    },
    
    password: {
        type: String,
    },

    emailAddress: {
        type: String,
    },

    gender: {
        type: String,
        enum: ["male", "female","N/A"]
    },

    address:{
        type: String,
    },

    favoriteGenre:{
        type:String,
    },

    hiredBy:{
        type: String
    },

    artpieces:[{
        type: String
    }]


});

module.exports = mongoose.model('User', userSchema);