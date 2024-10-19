const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const DB = process.env.MONGODB_URL 

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser:true
}).then(()=>console.log("Database Connected Successfully"))
.catch((err)=>console.log(err))

