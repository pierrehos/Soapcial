const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//register view engine
app.set('view engine' , 'ejs');
app.use(bodyParser.urlencoded({extended: true}));



app.listen(80, () => {
    console.log('plugged to port 80. server is runing');
});

app.get('/' , (req, res) =>{

    res.render('indexget');

});

app.get('/post' , (req, res) =>{

    res.render('indexpost');

});

app.get('/submit-get' , (req, res) =>{

    // res.send(req.query);
    
    const object =req.query;
    const firstName = object.first; 
    const lastName = object.last; 
    console.log(object);

    res.render('answer', {firstName , lastName});

});

app.post('/submit-post', (req, res) =>{
    const firstName = req.body.first; 
    const lastName = req.body.second;
    res.render('answer', {firstName , lastName});
});