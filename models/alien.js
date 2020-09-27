const mongoose = require('mongoose')

const alienSchema =new mongoose.Schema({
    name:{
        type:"string",
        require:true
    },
    tech:{
        type:"string",
        require:true
    },
    sub:{
        type:Boolean,
        require:true,
        default:false,
    }

})
module.exports =mongoose.model('Alien' , alienSchema)
