var mongoose=require('mongoose');
mongoose.set('useUnifiedTopology',true);
mongoose.connect("mongodb://loclhost:27017/blog_demo",{useNewUrlParser:true});


var postSchema = new mongoose.Schema({
	title:String,
	content:String
});

var Post=new mongoose.model("Post",postSchema);

var userSchema = new mongoose.Schema({
	email:String,
	name:String,
	posts:[postSchema]
});

var User = new mongoose.model("User",userSchema);

var newUser=new User({
	email:"sahil.jamwal78625@gmail.com",
	name:"Sahil Jamwal"

});

newUser.posts.push({
	title:"My first embedded code",
	content:"This code is an example of Data Associations in express. Cool na??"
});


newUser.save(function(error,user){
	if(error){console.log(error);}
	else{
		console.log(user);
	}
});