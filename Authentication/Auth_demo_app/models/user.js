var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var userSchema = new mongoose.Schema({
	user:String,
	password:String
});

userSchema.plugin(passportLocalMongoose);

module.exports=new mongoose.model("User",userSchema);