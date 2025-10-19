const express = require('express');
const app = express();
const fs = require('fs'); 
const path = require('path');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
    fs.readdir(`./files`, (err, fileinfo) =>{
        console.log(fileinfo);
    res.render("index", {files: fileinfo});
    });
});

app.get('/file/:filename', (req, res) =>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) =>{
        res.render('show', {filename: req.params.filename, filedata: filedata});
    });
});

app.get('/edit/:filename', (req, res) =>{
    res.render('edit', {filename: req.params.filename});
});

app.post('/edit', (req, res) =>{
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`, (err) =>{
        res.redirect("/");
    });
});

app.post('/create', (req, res) =>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err) =>{
        res.redirect("/");
    });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
