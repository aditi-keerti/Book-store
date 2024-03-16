const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    bookname:String,
    author:String,
    genre:String
})
const BookModel=mongoose.model('book',bookSchema);

module.exports={BookModel}