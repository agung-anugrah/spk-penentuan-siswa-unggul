const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/spk_siswa_unggul')
.then(()=>console.log('koneksi sukses'))
.catch(()=>console.log('koneksi gagal'))