var p1Button=document.querySelector("#p1");
var p2Button=document.querySelector("#p2");
var resetButton=document.querySelector("#reset");
var p1Display=document.querySelector("#p1Display");
var p2Display=document.querySelector("#p2Display");
var numInput=document.querySelector("input");
var winScoreDisplay=document.querySelector("#winScore");
var p1Score=0;
var p2Score=0;
var winningScore=5;
var gameOver=false;



p1Button.addEventListener("click",function(){

	if(!gameOver)
	{
		p1Score++;
		if(p1Score===winningScore){
			gameOver=true;
			p1Display.classList.add("winner");
		}
		p1Display.textContent=p1Score;
	}
	
});


p2Button.addEventListener("click",function(){

	if(!gameOver)
		{
			p2Score++;
			if(p2Score===winningScore){
				gameOver=true;
				p2Display.classList.add("winner");
			}
			p2Display.textContent=p2Score;
		}

});

resetButton.addEventListener("click",function(){

	reset();


});

function reset(){


	p1Score=0;
	p2Score=0;
	p1Display.textContent=0;
	p2Display.textContent=0;
	gameOver=false;
	p1Display.classList.remove("winner");
	p2Display.classList.remove("winner");

}



numInput.addEventListener("change",function(){

	winScoreDisplay.textContent=this.value;
	winningScore=Number(this.value);
	reset();

});
