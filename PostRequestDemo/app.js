var express=require('express');
var app=express();
var bodyparser=require('body-parser');


app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended:true}));

var friendList=["Anmol","Akshat","Prachi","Apoorva","Saksham"];


//routes
app.get("/",function(req,res){
	res.render("home");
});



app.post("/addfriend",function(req,res){
	var newfriend=req.body.newfriend;
	friendList.push(newfriend);
	res.redirect("/friends");
});


app.get("/friends",function(req,res){
	res.render("friends",{friends:friendList});
});






//listeners
app.listen(3000,function(){
	console.log("Server Started Successfully!!");
});