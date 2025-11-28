const {loadNilaiRataEigen} = require('./ahp.js')
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


// mengambil nilai siswa di dalam db
async function loadNilaiSiswa(){
    const nilai = await Siswa.find();
    return nilai;
};

// mengambil nilai siswa yang telah dikalikan dengan ahp
async function loadNilaiSiswaAhp(){
    const nilaiSiswa = await loadNilaiSiswa();
    const nilaiAhp = await loadNilaiRataEigen();
    const nilai = siswaAhp(nilaiAhp,nilaiSiswa);
    return nilai
};

// mengambil total nilai siswa yang telah dikalikan dengan ahp
async function loadNilaiTotalSiswa(){
    const nilaiSiswaAhp = await loadNilaiSiswaAhp();
    const nilai = totalSiswa(nilaiSiswaAhp);
    return nilai;
};

// mengurutkan nilai siswa
async function loadUrutanSiswa (){
    const nilaiTotalSiswa = await loadNilaiTotalSiswa();
    const nilai = rangking(nilaiTotalSiswa);
    await dbRangking(nilai);
    return nilai;
}

module.exports = {
    loadNilaiSiswaAhp,
    loadUrutanSiswa
}


