var express 	=require('express'),
 	app 		=express(),
 	bodyParser	=require('body-parser'),
 	expressSanitizer=require('express-sanitizer'),
 	mongoose	=require('mongoose'),
 	methodOverride= require('method-override');


mongoose.set('useUnifiedTopology',true);
mongoose.connect("mongodb://localhost:27017/restful_blog_app",{useNewUrlParser:true});


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.use(methodOverride("_method"));

//MOONGOOSE MODE/Config
var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date , default:Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);


// Blog.create({

// 	title:"Granite Hill",
// 	image:"https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
// 	body:"This is a huge granite hill, no bathrooms.  No water. Beautiful granite!"


// },function(error,blog){
// 	if(error)
// 		console.log(error);
// 	else
// 		console.log(blog);
// });


//RESTful routes


//Index Route
app.get("/",function(req,res){
	res.redirect("/blogs");
});


app.get("/blogs",function(req,res){

	Blog.find({},function(error,blog){
		if (error) {
			console.log(error);
		}
		else{
			res.render("blogs",{blogData:blog});
		}
	})

	
});


//New Route
app.get("/blogs/new",function(req,res){
	res.render("new");
});



//Create Route
app.post("/blogs",function(req,res){
	//create blog
	req.body.blog.body=req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog,function(error,newBlog){
		if(error){
			console.log(error);
		}
		else{
			//redirect to index page
			res.redirect("/blogs");
		}
	})
});


//SHOW Route
app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(error,foundBlog){
		if (error) {res.redirect("/blogs");}
		else{
			res.render("show",{blog:foundBlog});
		}
	});
});

//EDIT Route
app.get("/blogs/:id/edit",function(req,res){

	Blog.findById(req.params.id,function(error,foundBlog){
		if (error) {res.redirect("/blogs");}
		else{
			res.render("edit",{blog:foundBlog});
		}
	});

	
});



//UPDATE Route
app.put("/blogs/:id",function(req,res){
	req.body.blog.body=req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(error,updatedBlog){
		if (error) {res.redirect("/blogs");}
		else{
			res.redirect("/blogs/"+req.params.id);
		}
	});
});


//DELETE Route
app.delete("/blogs/:id",function(req,res){
	Blog.findByIdAndRemove(req.params.id,function(error){
		if (error) {
			console.log(error);
			res.redirect("/blogs");
		}
		else {
			console.log("Deleted Successfully");
			res.redirect("/blogs");
		}
	});
});


//listeners
app.listen(3000,function(){
	console.log("Server Staretd Successfuly!!");
});
