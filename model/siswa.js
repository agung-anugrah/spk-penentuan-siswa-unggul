const mongoose = require('mongoose')
// model schema nilai
const Siswa = mongoose.model('siswa',{
    nama:{
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
},'siswa')

module.exports = Siswa