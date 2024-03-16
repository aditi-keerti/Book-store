const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    title:String,
    author:String,
    description:String
},{
    versionKey:false
})
const BookModel=mongoose.model('book',bookSchema);

module.exports={BookModel}