const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
    //id         : {type:String, required:true, unique:true}
    userid       : {type: String}
   ,text         : {type: String}
   ,done         : {type: String}
   ,targetDate   : {type: String}
   ,creationDate : {type: Date}
   ,user         : {}
});

mongoose.model('Todo', todoSchema);
