const mongoose=require("mongoose");
require('dotenv').config();

const mongoURL=process.env.mongoURL

const Connection=mongoose.connect(mongoURL);  

module.exports={Connection};
