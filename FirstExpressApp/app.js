//Var declarations
var express = require('express');
var app=express();


//Routes
app.get("/",function(req,res){
	res.send("Hi There!!!");
});

app.get("/bye",function(req,res){
	res.send("GoodBye!!!");
});

app.get("/dog",function(req,res){
	console.log("Someone made a request on /dog");
	res.send("MEOW!!");
});

app.get("/r/:page",function(req,res){
	var page=req.params.page;
	res.send("Welcome to the "+page+" page.");
});

app.get("*",function(req,res){
	res.send("404 PAge not found!!!");
});


//Listeners
app.listen(3000,function(){
	console.log("Server has started!!!!");
});


