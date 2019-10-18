//Declaratives
var express = require("express");
var app=express();

//routes
app.get("/",function(req,res){
	res.send("Hi there, Welcome to my assignment!!");
});

app.get("/speak/:animal",function(req,res){
	var animal=req.params.animal;

	if(animal==="pig")
		res.send("The "+animal+" says 'Oink'.");
	else if(animal === "cow")
		res.send("The "+animal+" says 'Mooo'.");
	else if(animal === "dog")
		res.send("The "+animal+" says 'Woof Woof!!'.");
	else
		res.send("The "+animal+" says 'Hey nigga What's Up!!'.");

});

app.get("/repeat/:message/:frequency",function(req,res){

	var message=req.params.message;
	var frequency=Number(req.params.frequency);
	var result="";

	for(var i=0;i<frequency;i++){
		result+=message+" ";
	}
	res.send(result);
});


app.get("*",function(req,res){
	res.send("Page not found....What are u doing with ur life?????");
});


//listeners
app.listen(3000,function(){
	console.log("Server has been successfully started !!!");
});
