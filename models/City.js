/**
 * Created by hassna on 06/08/2015.
 */
var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var City=Schema({
    name:{type:String}

});
module.exports=mongoose.model("City",City);