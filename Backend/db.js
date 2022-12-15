const mongoose = require('mongoose')
const mongoURI ="mongodb://localhost:27017/cloudnotebook"
const connetToMongo =async()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to Mongo Successfully")
    })
}
module.exports=connetToMongo;