const mongoose = require('mongoose')
// model schema nilai
const Rangking = mongoose.model('rangking',{
    nama:{
        type:String,
        require:true,
    },
    total:{
        type:Number,
        require:true,
    },
    rangking:{
        type:Number,
        require:true,
    },
    total_pendek:{
        type:Number,
        require:true,
    }
},'rangking')

module.exports = Rangking