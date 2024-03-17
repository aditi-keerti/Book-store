const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    booksOwned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookModel' // Reference to the Book model
    }],
    booksRented: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookModel' // Reference to the Book model
    }]
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel};
