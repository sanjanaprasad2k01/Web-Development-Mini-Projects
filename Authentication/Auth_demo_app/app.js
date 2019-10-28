var express 				= require("express"),
 	mongoose 				= require("mongoose"),
 	bodyParser 				= require("body-parser"),
 	passport 				= require("passport"),
 	localStrategy 			= require("passport-local"),
 	passportLocalMongoose 	= require("passport-local-mongoose"),
 	User                    = require("./models/user");


var app =express();
mongoose.set('useUnifiedTopology',true);
mongoose.connect("mongodb://localhost:27017/auth_demo_app",{useNewUrlParser:true});
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
	secret:"Rusty is the best dog in the world",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=====================================
//ROUTES
//=====================================
app.get("/",function(req,res){
	res.render("home");
});


app.get("/secret",isLoggedIn, function(req, res){
   res.render("secret"); 
});


//AUTHENTICATION ROUTES
//show registrtion form
app.get("/register",function(req,res){
	res.render("register");
});

//do the signup process
app.post("/register",function(req,res){
	req.body.username;
	req.body.password;
	User.register(new User({username: req.body.username}), req.body.password ,function(error,user){
		if(error){
			console.log(error);
			return res.render("register");
		}else{
			passport.authenticate("local")(req,res,function(){
				 res.redirect("secret");
			})
		}

	});
});

//LOGIN ROUTES
//to show login form
app.get("/login",function(req,res){
	res.render("login");
});

//login logic
app.post("/login",passport.authenticate("local",{
	successRedirect:"/secret",
	failureRedirect: "/login"
}),function(req,res){
});

//LOGOUT logic
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
         return next();
    }
    res.redirect("/login");
}

//=====================================
//LISTENERS
//=====================================
app.listen(3000,function(){
	console.log("Server strted succcessfully!!!!");
});