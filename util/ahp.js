const Decimal = require('decimal.js');

nn = {
    nn:1,
    na:5,
    ns:2,
    nd:0.3,
    nk:4,
    nr:5
}
na = {
    nn:0.2,
    na:1,
    ns:0.33,
    nd:0.2,
    nk:0.33,
    nr:3
}
ns = {
    nn:0.5,
    na:3,
    ns:1,
    nd:0.33,
    nk:3,
    nr:5
}
nd = {
    nn:3,
    na:5,
    ns:3,
    nd:1,
    nk:3,
    nr:5
}
nk = {
    nn:0.25,
    na:3,
    ns:0.33,
    nd:0.33,
    nk:1,
    nr:3
}
nr = {
    nn:0.2,
    na:0.33,
    ns:0.2,
    nd:0.2,
    nk:0.33,
    nr:1
}
perbandigan_nn = [nn.nn,na.nn,ns.nn,nd.nn,nk.nn,nr.nn]
perbandigan_na = [nn.na,na.na,ns.na,nd.na,nk.na,nr.na]
perbandigan_ns = [nn.ns,na.ns,ns.ns,nd.ns,nk.ns,nr.ns]
perbandigan_nd = [nn.nd,na.nd,ns.nd,nd.nd,nk.nd,nr.nd]
perbandigan_nk = [nn.nk,na.nk,ns.nk,nd.nk,nk.nk,nr.nk]
perbandigan_nr = [nn.nr,na.nr,ns.nr,nd.nr,nk.nr,nr.nr]


jumlah_nn = perbandigan_nn.reduce((acc,curr)=>{
    return acc+curr
})
jumlah_na = perbandigan_na.reduce((acc,curr)=>{
    return acc+curr
})
jumlah_ns = perbandigan_ns.reduce((acc,curr)=>{
    return acc+curr
})
jumlah_nd = perbandigan_nd.reduce((acc,curr)=>{
    return acc+curr
})
jumlah_nk = perbandigan_nk.reduce((acc,curr)=>{
    return acc+curr
})
jumlah_nr = perbandigan_nr.reduce((acc,curr)=>{
    return acc+curr
})


jumlah = [jumlah_nn,jumlah_na,jumlah_ns,jumlah_nd,jumlah_nk,jumlah_nr]



eigen_perbadingan_nn = perbandigan_nn.map(e=>{
    return new Decimal(e/jumlah_nn)
})
eigen_perbadingan_na = perbandigan_na.map(e=>{
    return new Decimal(e/jumlah_na)
})
eigen_perbadingan_ns = perbandigan_ns.map(e=>{
    return new Decimal(e/jumlah_ns)
})
eigen_perbadingan_nd = perbandigan_nd.map(e=>{
    return new Decimal(e/jumlah_nd)
})
eigen_perbadingan_nk = perbandigan_nk.map(e=>{
    return new Decimal(e/jumlah_nk)
})
eigen_perbadingan_nr = perbandigan_nr.map(e=>{
    return new Decimal(e/jumlah_nr)
})


rata_eigen_perbandingan=eigen_perbadingan_nn.map((e,i)=>{
    return new Decimal(
        e
        .plus(eigen_perbadingan_na[i])
        .plus(eigen_perbadingan_ns[i])
        .plus(eigen_perbadingan_nd[i])
        .plus(eigen_perbadingan_nk[i])
        .plus(eigen_perbadingan_nr[i])/6
    )
})

const dummy= rata_eigen_perbandingan.reduce((acc,curr)=>{
    return acc.plus(curr)
}) 

const lamdaMax=rata_eigen_perbandingan.map((e,i)=>{
    return e*jumlah[i]
}).reduce((acc,curr)=>{
    return acc+curr
})

const ci = (lamdaMax-jumlah.length)/(jumlah.length-1)
const cr = ci/1.24


function totalNilai(nama,nn,na,ns,nd,nk,nr){
    const siswa = {
    nn,
    na,
    ns,
    nd,
    nk,
    nr,
    nama
    }

    siswa.jumlah_nn= siswa.nn*rata_eigen_perbandingan[0]
    siswa.jumlah_na= siswa.na*rata_eigen_perbandingan[1]
    siswa.jumlah_ns= siswa.ns*rata_eigen_perbandingan[2]
    siswa.jumlah_nd= siswa.nd*rata_eigen_perbandingan[3]
    siswa.jumlah_nk= siswa.nk*rata_eigen_perbandingan[4]
    siswa.jumlah_nr= siswa.nr*rata_eigen_perbandingan[5]

    siswa.jumlah_all = siswa.jumlah_nn+siswa.jumlah_na+siswa.jumlah_ns+siswa.jumlah_nd+siswa.jumlah_nk+siswa.jumlah_nr
    return {
        nama:siswa.nama,
        skor:siswa.jumlah_all,
    }
}






module.exports={
    totalNilai
}