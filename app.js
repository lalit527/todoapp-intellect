const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require ('path');

//app.use(logger('dev'));
app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());

// app.use(session({
// 	name: 'ensembleCookie',
// 	secret: 'ensembleSecret',
// 	resave: true,
// 	httpOnly: true,
// 	saveUninitialize: true,
// 	cookie: {secure: false}
// }));

// // set the templating engine 
// app.set('view engine', 'jade');

// //set the views folder
// app.set('views',path.join(__dirname + '/app/views'));


var dbPath = 'mongodb://localhost/todoApp27';

db = mongoose.connect(dbPath);

mongoose.connection.once('open', function(){
	console.log("database open");
 });

 var fs = require('fs');

 fs.readdirSync('./app/models').forEach(function(file){
      if(file.indexOf('.js')){
         require('./app/models/'+file);
      }
 });
 
 fs.readdirSync('./app/controllers').forEach(function(file){
      if(file.indexOf('.js')){
         var route = require('./app/controllers/'+file);
         route.controllerFunction(app);
      }
 });
// var auth = require("./middlewares/auth");
// app.use(auth.setLoogedInUser);
// app.use(auth.setLoogedInSupplier);

app.listen('3000', function(){
	console.log('listening on 3000');
});

// app.get('/', function(req, res){
//    res.send('Hello World');
// });