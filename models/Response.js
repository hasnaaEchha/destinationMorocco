/**
 * Created by hassna on 04/07/2015.
 */
var mongoose=require('mongoose'),
    Schema=mongoose.Schema;
var Response=new Schema({
    userName:{type:String},
    email:{type:String},
    questionId:{},
    description:{},
    _date:{type:Date,default:Date.now},
    good:{type:Number,default:0},
    bad:{type:Number,default:0}


})
module.exports=mongoose.model('Response',Response);