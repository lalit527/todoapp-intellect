const mongoose = require('mongoose');
const express = require('express');
const userRouter  = express.Router();
const userModel = mongoose.model('User');
const todoModel = mongoose.model('Todo');
var Promise = require("bluebird");
var async = require('async');
//{'_id': req.params.id}
module.exports.controllerFunction = function(app){
    userRouter.get('/all', function(req, res){
       userModel.find({}, function(err, result){
            if(err){
               res.status(404).send(err);
            }else if(result === undefined || result === ''){
                res.status(404).send(err);
            }else{
                res.status(200).send(result);
            }
       });
    });
    //user Detail
    userRouter.get('/singleUser/:id', function(req, res){
       userModel.findOne({'_id': req.params.id}, function(err, result){
            if(err){
               res.status(404).send(err);
            }else if(result === undefined || result === ''){
                res.status(404).send(err);
            }else{
                res.status(200).send(result);
            }
       });
    });
    
    //get all active todos for an user
    userRouter.get('/todo/singleUser/:id', function(req, res){
       userModel.findOne({'_id': req.params.id}, function(err, result){
            if(err){
               res.status(404).send(err);
            }else if(result === undefined || result === ''){
                res.status(404).send(err);
            }else{
                var allData = result;
                console.log(result.id);
                console.log(result.todo);
                todoModel.find({$and:[{'userid': result._id}, {'done': false}]}, function(err1, result1){
                    console.log(result1);
                    result.todo = result1;
                    res.status(200).send(result);
                });
               
            }
       });
    });

    //all user active todos
    userRouter.get('/todo/allUsers', function(req, res){

    //   async.series([
    //       function(callback){
    //           userModel.find({'isActive': true}, function(err, result){
    //             console.log('result'+result);
    //                 if(err){
    //                 res.status(404).send(err);
    //                 }else if(result === undefined || result === '' || result === null){
    //                     res.status(404).send(err);
    //                 }else{
    //                     var allData = [];
    //                     console.log('i'+result.length);
    //                     callback(null, result);
    //             }
    //           });
              
    //       },
    //       function(result, callback){
    //           console.log('func2'+result);
    //           console.log('--11--'+results);
    //            for (var i=0; i<result.length; i++){
    //                console.log('i'+i);
                   
    //                   (function(i){
    //                     (todoModel.find({'userid': result[i]._id}, function(err1, result1){
    //                         result[i].todo = result1;
    //                         //res.status(200).send(result);
    //                         console.log(result);
    //                 }));
    //                })(i);
    //             }
    //             callback(null, 2);
    //       },
    //     //   three: function(){
    //     //       res.status(200).send(result);
    //     //   }

    //   ], function(err, results){
    //       console.log(results);
    //       res.status(200).send(results);
    //   });
       userModel.find({'isActive': true}, function(err, result){
           console.log('result'+result);
            if(err){
               res.status(404).send(err);
            }else if(result === undefined || result === '' || result === null){
                res.status(404).send(err);
            }else{
                var allData = [];
                var allResult = result;
                console.log('i'+result.length);
                for (var i=0; i<result.length; i++){
                   console.log('i'+i);
                   
                      (function(i){
                        allData.push(todoModel.find({'userid': result[i]._id}, function(err1, result1){
                            allResult[i].todo = result1;
                            //res.status(200).send(result);
                            console.log(result);
                    }));
                   })(i);
                }
                //res.status(200).send(result);
                Promise.all(allData).then(function(){
                    console.log('pm'+allResult);
                    res.status(200).send(allResult);
                    //res.status(200).send(result);
                });
            }
       });
    });
 
    //create an user
     userRouter.post('/create', function(req, res){
       var date = (req.body.bday.split('/'));
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
       var newUser = new userModel({
             fName      : req.body.fname
            ,lName      : req.body.lname
            ,email      : req.body.email
            ,pinCode    : req.body.pincode
            ,birthDate  : newDate + '-' + newMonth + '-' + newYear
            ,isActive   : true
       });

       newUser.save(function(err){
           if(err){
             res.send(err);
           }else{
               res.status(200).send('User Created');
           }
       });
    });

    app.use('/user', userRouter);
}