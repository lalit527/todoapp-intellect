const mongoose = require('mongoose');
const express = require('express');
const todoRouter  = express.Router();
const todoModel = mongoose.model('Todo');
var authenticate = require('./../../middlewares/authenticate');
module.exports.controllerFunction = function(app){
    todoRouter.get('/all', function(req, res){
       todoModel.find({}, function(err, result){
            if(err){
               res.status(404).send(err);
            }else if(result === undefined || result === ''){
                res.status(404).send(err);
            }else{
                res.status(200).send(result);
            }
       });
    });

    todoRouter.get('/singletodo/:id', function(req, res){
       todoModel.findOne({'_id': req.params.id}, function(err, result){
            if(err){
               res.status(404).send(err);
            }else if(result === undefined || result === ''){
                res.status(404).send(err);
            }else{
                res.status(200).send(result);
            }
       });
    });

    //for a user get all active todo
    todoRouter.get('/alltodo/user/:userid', function(req, res){
    var finalResult = [];
    //  var curDate = new Date();
    //   var curdate = curDate.getDate();
    //   var curmonth  = curDate.getMonth();
    //   var curyear = curDate.getFullYear();
    //   var datetime = curdate + '-' + curmonth+ '-' + curyear;
    //   console.log(datetime);
    //   var today = Date.parse(new Date(curdate, curmonth, curyear));
    //   var tomorrow = Date.parse(new Date(curdate, curmonth, curyear))+ 24 * 60 * 60 * 1000;
      //console.log(d);
       //todoModel.findOne({$and:[{'userid': req.params.userid}, {$or:[{(targetDate.split('-'))}]}]}, function(err, result){
       todoModel.find({'userid': req.params.userid}, function(err, result){
            if(err){
               res.status(404).send(err);
            }else if(result === undefined || result === ''){
                res.status(404).send(err);
            }else{
                console.log('todo'+result);
                var date = new Date();
                date = date.toDateString();
                var today = Date.parse(date);
                var tomorrow = Date.parse(date)+ 24 * 60 * 60 * 1000;
                console.log('now'+today);
                console.log('tm'+tomorrow);
                for(var indx = 0; indx< result.length; indx++){
                      console.log('tdt'+Date.parse(result[indx].targetDate));
                      console.log(result[indx].targetDate);
                      var tdate = Date.parse(result[indx].targetDate);
                      if(tdate >= today && tdate <= tomorrow){
                          finalResult.push(result);
                      }
                }
                res.status(200).send(finalResult);
            }
       });
    });

     todoRouter.post('/create/:userid', authenticate.checkLogin, function(req, res){
      var date = (req.body.tdate.split('/'));
       console.log(date);
       var newDate = date[0];
       var newYear = date[2];
       var newMonth = date[1];
        var months = new Array(12);
        months[0] = "JAN";
        months[1] = "FEB";
        months[2] = "MAR";
        months[3] = "APR";
        months[4] = "MAY";
        months[5] = "JUN";
        months[6] = "JUL";
        months[7] = "AUG";
        months[8] = "SEP";
        months[9] = "OCT";
        months[10] = "NOV";
        months[11] = "DEC";
        var newMonth = months[newMonth-1];
       var newTodo = new todoModel({
             userid       : req.params.userid
            ,text         : req.body.text
            ,done         : false
            ,targetDate   : newDate + '-' + newMonth + '-' + newYear
            ,creationDate : new Date()
       });

       newTodo.save(function(err){
           if(err){
             res.send(err);
           }else{
               res.status(200).send('todo Created');
           }
       });
    });

    app.use('/todo', todoRouter);
}