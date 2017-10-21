var mongoose = require('mongoose');
var userModel = mongoose.model('User');


exports.checkLogin = function(req,res,next){

	 userModel.findOne({'_id': req.params.userid}, function(err, result){
            if(err){
               res.status(404).send(err);
            }else if(result === undefined || result === '' || result === null){
                res.status(404).send(err);
            }else{
                next();
               
            }

});
}