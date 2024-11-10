const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[2,'username must be at least 13 characters long']


    },
    email : {
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[2,'Email must be at least 13 characters long']


    },
    password: {
        type:String,
        required:true,
        trim:true,
        minlength:[5,'Email must be at least 13 characters long']

    }
})

const user=mongoose.model('user',userSchema)
module.exports =user;