/**
 * Created by hassna on 06/08/2015.
 */
var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var Question=Schema({
    name:{type:String},
    userName:{type:String},
    ville:{type:String},
    description:{type:String},
    _date:{type:Date,default:Date.now},
    countResponse:{type:Number,default:0},
    good:{type:Number,default:0},
    bad:{type:Number,default:0}
});
module.exports=mongoose.model("Question",Question);