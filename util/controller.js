const Rangking = require('../model/rangking');
const {rangkingSiswa} = require('./rangking');

async function nilaiSiswa(nama){
    const nilai = (await rangkingSiswa()).nilaiSiswaAhp;
    const nilaiSiswa = nilai.find(a => a.nama === nama);
    return nilaiSiswa
}


module.exports={
    nilaiSiswa
}