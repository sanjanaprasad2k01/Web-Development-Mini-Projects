var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


mongoose.set('useUnifiedTopology', true); //to remove the deprecation in new mongoose version
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));



//set schema 
var campgroundSchema = new mongoose.Schema({
	name:String,
	image:String,
	description:String
});

//set model
var Campground=mongoose.model("Campground",campgroundSchema);





//routes
app.get("/",function(req,res){
	res.render("landing");
});


app.get("/campgrounds",function(req,res){
	
	Campground.find({},function(error,allCamps){
		if(error)
			console.log(error);
		else{
			res.render("index",{campgrounds:allCamps});
		}
	});

});

app.post("/campgrounds",function(req,res){
	//fetch the form data and add it to campgrounds array
	var campName=req.body.name;
	var image=req.body.imageurl;
	var desc=req.body.description;
	var CampgroundObject={name:campName,image:image,description:desc};
	//campgrounds.push(imageObject);
	//add new Campground to DB
	Campground.create(CampgroundObject,function(error,newCamp){
		if (error) {
			console.log(error);
		}
		else{
			//redirect to suitable page
			res.redirect("/campgrounds");
		}
	});

});


app.get("/campgrounds/new",function(req,res){
	res.render("new");
});

app.get("/campgrounds/:id",function(req,res){

	
	Campground.findById(req.params.id,function(error,idCamp){
		if (error) {
			console.log(error);
		}
		else{
			res.render("show",{campgrounds:idCamp});
		}
	});




	//res.send("This will be our show page one day");
	
});


//listeners
app.listen(3000,function(req,res){
	console.log("Yelp Camp Server is up and running.!!!!");
});








