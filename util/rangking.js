const {ahp} = require('./ahp.js')
require('./db.js')
const Siswa = require('../model/siswa.js')
const Rangking = require('../model/rangking.js')

// mengaliikan nilai siswa dengan nilai vektor ahp
function siswaAhp(nilaiAhp,nilaiSiswa){
    const nilai = []
    nilaiSiswa.forEach(e => {
        let siswa={
            nama:e.nama,
            nn:e.nn*nilaiAhp.nn,
            na:e.na*nilaiAhp.na,
            ns:e.ns*nilaiAhp.ns,
            nd:e.nd*nilaiAhp.nd,
            nk:e.nk*nilaiAhp.nk,
            nr:e.nr*nilaiAhp.nr,
        }
        nilai.push(siswa)
    });
    return nilai
}

// menjumlah semua nilai siswa
function totalSiswa(nilaiSiswaAhp){
    nilai = []
    nilaiSiswaAhp.forEach(e=>{
        const siswa = {
            nama:e.nama,
            total:e.nn+e.na+e.ns+e.nd+e.nk+e.nr
        }
        nilai.push(siswa)
    })
    return nilai
}

// mengurutakan rangking siswa
function rangking(nilaiTotalSiswa){
    return nilaiTotalSiswa.sort((a,b)=>b.total - a.total)
}

//memasukan rangking kedalam db
async function dbRangking(data){
    await Rangking.deleteMany(); 

    data.forEach((e, i) => {
        e.rangking = i + 1;
        e.total_pendek = Math.floor(e.total * 10000) / 10000;
    });

    await Rangking.insertMany(data);
}



async function rangkingSiswa(){
    const nilaiAhp = await ahp()
    const nilaiSiswa = await Siswa.find()
    const nilaiSiswaAhp = siswaAhp(nilaiAhp,nilaiSiswa)
    const nilaiTotalSiswa = totalSiswa(nilaiSiswaAhp)
    const urutanSiswa = rangking(nilaiTotalSiswa)
    await dbRangking(urutanSiswa)
    return {urutanSiswa,nilaiTotalSiswa,nilaiSiswaAhp}
}


module.exports = {
    rangkingSiswa
}


