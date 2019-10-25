/*

step-1--->install mongoose
step-2--->connect db
step-3--->create schema
step-4--->create model
step-5--->interact with db

*/

//step1 & step2
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

//step3
var catSchema= new mongoose.Schema({
	name:String,
	age:Number,
	temprament:String
});

//step4
var Cat=mongoose.model("cat",catSchema);

//step5
//adding new cat to db

	// var george=new Cat({
	// 	name:"George",
	// 	age:12,
	// 	temprament:"scumby"
	// });


	// george.save(function(error,cat){
	// 	if(error)
	// 		console.log("Something  went wrong");
	// 	else
	// 	{
	// 		console.log("A cat has been inserted into db");
	// 		console.log(cat);
	// 	}
	// });

//another method to add cat
Cat.create({
	name:"Snow White",
	age:5,
	temprament:"Bland"
},function(error,cat){
	if(error)
		console.log("error has been generated.");
	else
		console.log("Cat successfully added to DB");
});



//retrieve all cats from the db and show it in the terminal 
Cat.find({},function(error , cats){
	if(error)
		comsole.log("Some error has been generated");
	else
	{
		console.log("All the cats in the db are :");
		console.log(cats);
	}
});