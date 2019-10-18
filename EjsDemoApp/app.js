var express=require("express");
var app=express();

app.use(express.static("public"));//to tell express to include public folder files for serving 
app.set("view engine","ejs");	//no need to write .ejs in render file with this command

//routes
app.get("/",function(req,res){
	res.send("Hey There");
});


app.get("/find/:thing",function(req,res){
	var thing=req.params.thing;

	res.render("home",{thingVar: thing});
});

app.get("/posts",function(req,res){
	var posts=[
	
		{title:"Intro To C++", author:"E balagoSwamy"},
		{title:"Let us C ", author:"Yashwant Kenaltar"}
	];

	res.render("posts",{posts:posts});
});


//listeners
app.listen(3000,function(){

	console.log("Server successfully started!!!!");
});