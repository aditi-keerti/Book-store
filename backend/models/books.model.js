const mongoose=require('mongoose');

const bookSchema=mongoose.Schema({
    title:String,
    author:String,
    description:String,
    rentPrice: Number,
    buyPrice: Number,
    status: { type: String, enum: ['Available', 'Rented', 'Sold'], default: 'Available'}
},{
    versionKey:false
})
const BookModel=mongoose.model('book',bookSchema);

module.exports={BookModel}