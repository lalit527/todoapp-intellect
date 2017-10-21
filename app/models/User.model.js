const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    //id         : {type:String, required:true, unique:true}
    fName      : {type: String}
   ,lName      : {type: String}
   ,email      : {type: String, unique:true}
   ,pinCode    : {type: Number}
   ,birthDate  : {type: String}
   ,isActive   : {type: Boolean}
   ,todo       : {}
});

mongoose.model('User', userSchema);
