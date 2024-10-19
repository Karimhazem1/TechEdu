const mongoose = require('mongoose')
const validator = require('validator')

const adminSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
        unique:true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("no valid email")
            }
        }
    },
    password:{
        type:String,
        required: true,
        minlength:6,
    },
})

const adminModel = new mongoose.model('admin',adminSchema )

module.exports = adminModel;
