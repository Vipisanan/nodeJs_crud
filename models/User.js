const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    name:{
        type:"string",
        require:true
    },
    email:{
        type:"string",
        require:true
    },
    phone:{
        type:"string",
        require:true
    },
    password:{
        type:"string",
        require:true,
    }

})
module.exports =mongoose.model('User' , userSchema)
