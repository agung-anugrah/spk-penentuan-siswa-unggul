const express = require('express');
const expressLayout = require('express-ejs-layouts')
const {rangkingSiswa} = require('./util/rangking.js');
const {nilaiSiswa} = require('./util/controller.js')
const Siswa = require('./model/siswa.js')
const {ahp} = require('./util/ahp.js');
const Rangking = require('./model/rangking.js');
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
    const siswa = (await rangkingSiswa()).urutanSiswa;
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
        const faktorPrioritas = await ahp();
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




app.use('/',(req,res)=>{
    res.status(404);
    res.send('404')
})
// listen
app.listen(port,()=>{
    console.log(`Example app listening on port : http://localhost:${port}`)
})