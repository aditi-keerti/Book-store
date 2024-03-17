const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
      },
    booksOwned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }],
    booksRented:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }]
},{
    versionKey:false
})
const UserModel=mongoose.model('user',userSchema);

module.exports={UserModel}