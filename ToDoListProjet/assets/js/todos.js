//to change the color on clicking and strike through effect
$("ul").on("click","li",function(){
	$(this).toggleClass("selected");
});

//delete todos by clicking on delete
$("ul").on("click","span",function(){
	$(this).parent().fadeOut(function(){
		$(this).remove();
	});
});

//add a new Todo in  the list

$("input[type='text']").keypress(function(event){
	if(event.which === 13)
	{
		var todoText=$(this).val();
		$(this).val("");
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> "+todoText+"</li>");
	}
});

//toggle the input button
$(".fa-plus").click(function(){

	$("input[type='text']").fadeToggle();


});