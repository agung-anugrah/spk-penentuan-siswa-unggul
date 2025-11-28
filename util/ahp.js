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


// mengambil nilai dari db
async function loadNilai(){
    const nilai = await Nilai.find()
    return nilai
}

// menjulamlah kan semua nilai
async function loadNilaiTotal(){
    const data = await loadNilai()
    const nilai = jumlahNilai(data)
    return nilai
}


// mengambil nilai eigen
async function loadNilaiEigen(){
    const data = await loadNilai()
    const nilaiTotal = await loadNilaiTotal()
    const nilai = Eigen(data,nilaiTotal)
    return nilai
}

// mengambil nilai jumlah eigen
async function loadNilaiJumlahEigen(){
    const nilaiEigen = await loadNilaiEigen();
    const nilai = jumlahEigen(nilaiEigen);
    return nilai;
}

// mengambil nilai rata-rata eigen
async function loadNilaiRataEigen(){
    const nilaiJumlahEigen = await loadNilaiJumlahEigen();
    const nilai = rataEigen(nilaiJumlahEigen);
    return nilai
}

// mengambil nilai jumlah dan rata-rata
async function nilaiJumlahRataEigen(){
    const nilaiEigen = await loadNilaiEigen();
    const jumlahEigen = await loadNilaiJumlahEigen();
    const rataEigen = await loadNilaiRataEigen();
    const nilaiGabungan = [

    ]
    nilaiEigen.forEach(e=>{
        const nilai = {
            key:e.key,
            nn:Number(e.nn.toFixed(3)),
            na:Number(e.na.toFixed(3)),
            ns:Number(e.ns.toFixed(3)),
            nd:Number(e.nd.toFixed(3)),
            nk:Number(e.nk.toFixed(3)),
            nr:Number(e.nr.toFixed(3)),
            jumlah:Number(jumlahEigen[e.key].toFixed(3)),
            rata:Number(rataEigen[e.key].toFixed(3))
        }
        nilaiGabungan.push(nilai)
    })
    return nilaiGabungan
}

module.exports={
    loadNilaiRataEigen,    
    nilaiJumlahRataEigen
}