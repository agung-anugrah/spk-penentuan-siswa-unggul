const express = require('express');
const expressLayout = require('express-ejs-layouts')
const {siswa,addSiswa} = require('./util/controller.js');
require('./util/db.js')


const app = express();
const port = 3000;


// === Tambahkan ini agar bisa baca data form POST ===
app.use(express.urlencoded({ extended: true }));
// Jika nanti kamu juga kirim data JSON pakai fetch atau axios:
app.use(express.json());


app.set('view engine','ejs');
app.use(expressLayout);

// localhost
app.get('/',(req,res)=>{
    res.render('index',{
        siswa,
        layout:'layouts/main-layouts.ejs',
        position:'index'
    })
});
// app.get('/config',(req,res)=>{
//     res.render('config',{
//         nama:script.rangking,
//         layout:'layouts/main-layouts.ejs',
//         position:'config'
//     })
// });
app.get('/input',(req,res)=>{
    res.render('input',{
        layout:'layouts/main-layouts.ejs',
        position:'input'
    })
});

app.post('/input/simpan', (req, res) => {
    addSiswa(req.body)  
    res.redirect('/')
  });


app.use('/',(req,res)=>{
    res.status(404);
    res.send('404')
})
// listen
app.listen(port,()=>{
    console.log(`Example app listening on port : http://localhost:${port}`)
})