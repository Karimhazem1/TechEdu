const mongoose = require("mongoose");
const validator = require('validator');
const courseSchema = new mongoose.Schema({
    cname: {
        type:String,
        required:true,
    },

    Iname: {
        type:String,
        required:true,
    },

    description: {
        type:String,
        required:true,
    },

    content: {
        type:String,
        required:true,
    },

    categoryCourse : {
        type:String,
        required:true,
    },

    courseType: {
        type:String,
        required:true,
    },

    price: {
        type: Number,
        required: true,
        validate(value) {
            if (isNaN(value)) {
                throw new Error("Invalid Price");
            }
        }
    },

    status: {
        type:String,
        required:true,
    },
    
    courseProfile: {
        type:String,
        required:true,
    },

    courseVideo: {
        type:String,
        required:true,
    },
    
    dataCreated: Date,
    dataUpdated: Date,

})


const courseModel = mongoose.model('courses', courseSchema);

module.exports = courseModel;