const {loadNilaiSiswaAhp} = require('./rangking');

async function nilaiSiswa(nama){
    const nilai = await loadNilaiSiswaAhp();
    const nilaiSiswa = nilai.find(a => a.nama === nama);
    return nilaiSiswa
}


module.exports={
    nilaiSiswa
}