/*********************************************************************************
*  WEB322 – Assignment 02 
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students. 
*
*Name: Daryan Chan Student ID: 113973182 Date: 1/24/2020
*
*Online (Heroku) Link: https://pacific-temple-85632.herokuapp.com/
*
********************************************************************************/ 

//This code is like a header for C++. Used so that path.join feature can be used
//in line 36
var path = require("path");

//basically like header file for C++. required to connect to data-service.js module 
//so that code from that file can be used be used here
var dataService = require('./data-service')

//allows us to use get. ex app.get in line 36
var express = require("express");
var app = express();

//This code is basically to connect to heroku
var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

//note to self: app.use(express.static('public')) will be explained week 4
app.use(express.static('public')); 
// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
  res.sendFile(path.join(__dirname,"/views/home.html"))
});

// setup another route to listen on /about. File sends html page to the localport
app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname,"/views/about.html"))
});

//If the /people is requested, this function will be called. dataService refers back to data-service.js module
//and utilize the getAllPeople() function from data-service.js module
app.get("/people", function(req,res){
  dataService.getAllPeople()
  .then((data)=>{
    res.json(data);
  })
  .catch(err=>{
    res.json(err);
  })
});

//If the /cars is requested, this function will be called. dataService refers back to data-service.js module
//and utilize the getCars() function from data-service.js module
app.get("/cars", function(req,res){
  dataService.getCars()
  .then((data)=>{
    res.json(data);
  })
  .catch(err=>{
    res.json(err);
  })
});

//If the /stores is requested, this function will be called. dataService refers back to data-service.js module
//and utilize the getStores() function from data-service.js module
app.get("/stores", function(req,res){
  dataService.getStores()
  .then((data)=>{
    res.json(data);
  })
  .catch(err=>{
    res.json(err);
  })
});

//this * means everything. If requested file isn't found, this function will
//display an error
app.get('*', function(req, res) {  
  res.send('<h3>page not found<h3>');
});



// setup http server to listen on HTTP_PORT and then calls onHTTpStart once connection
//has been made


dataService.initialize()
.then(()=>{
  app.listen(HTTP_PORT, onHttpStart);
})
.catch(err=>{
  console.log(err);
})

