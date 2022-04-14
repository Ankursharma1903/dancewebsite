const express = require("express");
const path = require("path");
const app = express();
const bodyparser=require("body-parser");
// app.usebodyparsor.json     to use boduparsar
// here we have not used body parsar
// its a middleware
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contactdance',{useNewUrlParser:true});
const port = 80;


// define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  var contact = mongoose.model('contact', contactSchema);
// it likely same for mysql



// HERITANCE TELL HOW THE PUG RENDER THAT TEMPLATE AND HOW CAN WE EXTEND THAT TEMPLATE FOR THIS WE MAKE BASE.PUG , home and contact TEMPLATE

//USED UNSPLASH FOR IMAGES
//WE ARE MAKING CARDS HERE FOR SPONSOR SECTION

// express staic stuff
// serving staic files
// app.use(express.static('static',option))
// i commented the above app use line as its giving error for my file
app.use('/static',express.static('static'))
app.use(express.urlencoded())

//pug specific stuff
app.set('view engine','pug')//set the template engine as pug
//set the views directory
app.set('views',path.join(__dirname,'views'))

// we use in pug code and attribute section to use the pug template and make index.pug properly

// Endpoints
app.get('/',(req,res)=>{
  
    const params ={}
    res.status(200).render('home.pug',params);
})
// this serves base.pug but filled with all the details in the home.pug


//for contact form
app.get('/contact',(req,res)=>{
  
    const params ={}
    res.status(200).render('contact.pug',params);
})

// to get the RESPONSE FROM USER WE ARE USING THE POST REQUEST
// to use express post we have to install  A PACKAGE
// npm i body-parser
// above require body parser is used for this
app.post('/contact',(req,res)=>{
  
  var mydata = new contact(req.body);
//   so when someone click we will form a new data
mydata.save().then(()=>{
    res.send("this item has been saved to the database")
}).catch(()=>{
 res.status(400).send("item was not saved");
}) //this will save that data and return a promise
// catch will show if any error occured
// before using check that in YOUR CONTACT FORM U HAVE GIVEN METHOD = POST
    // res.status(200).render('contact.pug');
})
// form should have /contact and action post
// Start the server
app.listen(port,()=>{
   console.log(`the application started successfully on port ${port}`);
});
// write mongod in different terminal by adding a new one by clicking +

// go in mongoose docs on internet to see the commands

// write cs c:  to change the directory to c drive and then run mongo d

// in another terminal write mongo
// in mongo terminal write
// use contactDance
// show collections
// we can use bootstrap alert


// write in mongoose 
// db.contacts.find()
// to see all the data stored in it