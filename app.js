const express = require('express');
const body_parser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({extended: true}));

app.listen(80);

app.get('/', (req, res) => {
    res.status(200).render('login-signup');
});

app.get('/profile', (req, res) => {
    res.status(200).render('profile');
});

app.get('/bubble', (req, res) => {
    res.status(200).render('bubble');
});

app.use((req, res) =>{
    res.status(404).render('404' , {title:'error - not found'});

});



const PICTURES_DIR = './pictures';

// קבלת תמונה ספציפית
app.get('/getPic/:filename', function(req, res) {
	res.sendFile(path.resolve(PICTURES_DIR + '/' + req.params.filename));
});

// קבלת רשימת תמונות
app.get('/getImages', function(req, res) {
	const files = fs.readdirSync(PICTURES_DIR);
	res.json(files);
});

// נגדיר לאיזו תיקייה ילכו העלאות קבצים
const upload = multer({dest:'./pictures/'});
// העלאת תמונות
app.post('/uploadImage', upload.single('upload'), function(req, res) {
	const file = req.file;
	console.log('got file:', file);
	fs.renameSync(path.resolve(file.path), path.resolve(file.destination + file.originalname));
	res.send('ok');
});





// app.get('/newlogin', (req, res) => {
//     res.status(200).render('newlogin');
// });

// app.get('/signup', (req, res) => {
//     res.status(200).render('signup');
// });

// app.post('/login-details', (req, res) =>{
//     const email = req.body.email; 
//     const password = req.body.password;
//     res.status(200).render('login-details', {email , password});
// });