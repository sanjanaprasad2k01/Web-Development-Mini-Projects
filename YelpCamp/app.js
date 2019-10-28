var express 	= require('express'),
	 app 		= express(),
	 bodyParser	= require('body-parser'),
	 mongoose	= require('mongoose'),
	 Campground = require("./models/campgrounds");
	 Comment 	= require("./models/comments");
	 seedDB		= require("./seeds");

mongoose.set('useUnifiedTopology', true); //to remove the deprecation in new mongoose version
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));


//call to seed function
seedDB();


//===================================================
//CAMPGROUNDS ROUTES
//===================================================
app.get("/",function(req,res){
	res.render("landing");
});


app.get("/campgrounds",function(req,res){
	
	Campground.find({},function(error,allCamps){
		if(error)
			console.log(error);
		else{
			res.render("campgrounds/index",{campgrounds:allCamps});
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
	res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground){
        if(error){
            console.log(error);
        } else {
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campgrounds: foundCampground});
        }
    });
})

//===================================================
//COMMENTS ROUTES
//===================================================

//Comment NEW Route
app.get("/campgrounds/:id/comments/new",function(req,res){
	
	Campground.findById(req.params.id,function(error,campground){
		res.render("comments/new",{campground:campground});
	});
});


//Comment CREATE Route
app.post("/campgrounds/:id/comments",function(req,res){
	//lookup campground using ID
	Campground.findById(req.params.id,function(error,campground){
		if(error){
			console.log(error);
		}else{
			//create a new comment
			Comment.create(req.body.comment,function(error,comment){
				if(error){
					console.log(error);
				}else{
					//connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					
					//redirect to campground show page
					res.redirect("/campgrounds/"+req.params.id);
				}
			})
		}
	});
});






//===================================================
//LISTENERS
//===================================================

app.listen(3000,function(req,res){
	console.log("Yelp Camp Server is up and running.!!!!");
});








