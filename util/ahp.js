const Nilai = require('../model/nilai')
require('./db')

// mencari jumlah nilai
function jumlahNilai(nilais){
    let total = {
        nn:0,
        na:0,
        ns:0,
        nd:0,
        nk:0,
        nr:0
    }
    nilais.forEach(nilai => {
        total.nn += nilai.nn
        total.na += nilai.na
        total.ns += nilai.ns
        total.nd += nilai.nd
        total.nk += nilai.nk
        total.nr += nilai.nr
    });
    return total
}


// mencari nilai eigen
function Eigen(data,jumlahNilai){
    nilaiEigen = []
    data.forEach(e=>{
        data={
            key:e.key,
            nn:e.nn/jumlahNilai.nn,
            na:e.na/jumlahNilai.na,
            ns:e.ns/jumlahNilai.ns,
            nd:e.nd/jumlahNilai.nd,
            nk:e.nk/jumlahNilai.nk,
            nr:e.nr/jumlahNilai.nr,
        }
        nilaiEigen.push(data)
    });
    return nilaiEigen
};


// mencari jumlah eigen
function jumlahEigen(data){
    let nilai = {};
    data.forEach(e=>{
        const i = e.key;
        if(!nilai[i]) {
            nilai[i] = 0
        } 
        nilai[i] += e.nn + e.na + e.ns + e.nd + e.nk + e.nr;
    });

    return nilai;
}


// rata-rata nilai eigen
function rataEigen(nilaJumlahEigen){
    const nilai = {}
    const panjang = Object.keys(nilaJumlahEigen).length;
    Object.entries(nilaJumlahEigen).forEach(([key,val])=>{
        nilai[key] = val/panjang
    })
    return nilai
    
}

async function ahp(){
    const data = await Nilai.find()
    const nilaiTotal = jumlahNilai(data)
    const nilaiEigen = Eigen(data,nilaiTotal)
    const nilaJumlahEigen = jumlahEigen(nilaiEigen)
    const nilaiRataEigen = rataEigen(nilaJumlahEigen)

    return nilaiRataEigen
}


module.exports={
    ahp
}