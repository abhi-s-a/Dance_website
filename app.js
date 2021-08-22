const express = require('express');
const path = require ('path');
const app = express();

// creating database and connecting 
const  mongoose = require('mongoose');
const bodyparser= require('body-parser')
mongoose.connect('mongodb://localhost/contactdance',{useNewUrlParser:true});
const port = 8000;

// defining schema for mongo database
var contactschema = new mongoose.Schema({
    Name:String,
    Phone:String,
    Email:String,
    Address:String,
    desc:String
});

var contact=mongoose.model('contact',contactschema);

// express specific stuff
app.use('/static', express.static('static'))//for serving static files
app.use(express.urlencoded())

// pug specific stuff
app.set('view engine','pug')//set the template engine as pug
app.set('views',path.join(__dirname,'views'))//set the views directeory 

// our pug demo end point
app.get("/",(req,res)=>{
    const params ={}
    res.status(200).render('home.pug',params);
  
});
app.get("/contact",(req,res)=>{
    const params ={}
    res.status(200).render('contact.pug',params);
  
});
app.post("/contact",(req,res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send('the  item has been saved to database')
    }).catch(()=>{
        res.status(400).send('item was not sent.')
    })
    // res.status(200).render('contact.pug');
  
});


// starts the server
app.listen(port,()=>{
    console.log(`the application started sucessfully on port ${port}`)
})

