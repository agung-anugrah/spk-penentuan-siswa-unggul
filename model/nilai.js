const mongoose = require('mongoose')
// model schema nilai
const Nilai = mongoose.model('nilai',{
    key:{
        type:String,
        require:true,
    },
    nn:{
        type:Number,
        require:true,
    },
    na:{
        type:Number,
        require:true,
    },
    ns:{
        type:Number,
        require:true,
    },
    nd:{
        type:Number,
        require:true,
    },
    nk:{
        type:Number,
        require:true,
    },
    nr:{
        type:Number,
        require:true,
    },
},'nilai')

module.exports = Nilai