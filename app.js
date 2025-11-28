const express = require('express');
const expressLayout = require('express-ejs-layouts')
const {loadUrutanSiswa} = require('./util/rangking.js');
const {nilaiSiswa} = require('./util/controller.js')
const Siswa = require('./model/siswa.js')
const {nilaiJumlahRataEigen, loadNilaiRataEigen} = require('./util/ahp.js');
const Rangking = require('./model/rangking.js');
const Nilai = require('./model/nilai.js');
require('./util/db.js')


const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// file public
app.use(express.static('public'))


app.set('view engine','ejs');
app.use(expressLayout);



// home page
app.get('/',async(req,res)=>{
    const siswa = await loadUrutanSiswa();
    const skor =  await Rangking.find()
    res.render('index',{
        siswa,
        layout:'layouts/main-layouts.ejs',
        position:'index',
        skor
    })
});

// detail ppage
app.get(
    '/detail/:nama',
    async(req,res)=>{
        const evaluasiKriteria = await Siswa.findOne({nama:req.params.nama});
        const faktorPrioritas = await loadNilaiRataEigen();
        const jumlahSkorRanking = await Rangking.findOne({nama:req.params.nama});
        const nilaiSkorSiswa = await nilaiSiswa(req.params.nama); 
        res.render('detail',{
                title:'halaman detail',
                layout:'layouts/main-layouts.ejs',
                position:'detail',
                faktorPrioritas,
                evaluasiKriteria,
                nilaiSkorSiswa,
                jumlahSkorRanking
            },
        )
    }
)

app.get(
    '/config',
    async(req,res)=>{
        const nilai = await Nilai.find()
        const eigen = await nilaiJumlahRataEigen()
        // const 
        res.render(
            'config',{
                title:'halaman configurasi',
                layout:'layouts/main-layouts.ejs',
                position:'config',
                nilai,
                eigen
            }
        )
    }
)

app.get(
    '/config/add',
    async(req,res)=>{
        const nilai = await Nilai.find()
        res.render(
            'add-kriteria',{
                title:'halaman add kriteria',
                layout:'layouts/main-layouts.ejs',
                position:'add-kriteria',
                nilai,
            }
        )
    }
)
app.get(
    '/test',
    async(req,res)=>{
        const nilai = await Nilai.find()
        res.render(
            'test',{
                title:'halaman add kriteria',
                layout:'layouts/main-layouts.ejs',
                position:'add-kriteria',
                nilai,
            }
        )
    }
)

app.use('/',(req,res)=>{
    res.status(404);
    res.send('404')
})
// listen
app.listen(port,()=>{
    console.log(`Example app listening on port : http://localhost:${port}`)
})