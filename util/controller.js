const {totalNilai} = require('./ahp.js')

let siswa=[
totalNilai('panda',0.390,0.292,0.208,0.148,0.164,0.133),
totalNilai('angga',0.186,0.292,0.162,0.138,0.164,0.130),
totalNilai('hendra',0.081,0.086,0.052,0.055,0.052,0.052),
totalNilai('junub',0.064,0.107,0.104,0.078,0.076,0.101), 
totalNilai('payau',0.186,0.180,0.282,0.251,0.201,0.292),
totalNilai('kasiak',0.186,0.180,0.282,0.251,0.201,0.292),
]

// menambah siswa
function addSiswa(data){
    const siswaBaru = totalNilai(data.nama,data.nn,data.na,data.ns,data.nd,data.nk,data.nr)
    siswa.push(siswaBaru)
}


// harus dibawah me-rangking siswa
siswa.sort((a,b)=>b.skor-a.skor);


module.exports ={
    siswa,
    addSiswa
} 