var buttonColors= ["red","blue","green","yellow"];
var level=0;
var userPresses=0;
var started =false;
var gamePattern =[];
var userClickedPattern=[];
function nextSequence(){
  userClickedPattern=[];
  userPresses=0;
  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColor= buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);
   $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
   var audio = new Audio("sounds/"+randomChosenColor+".mp3");
   audio.play();
   level=level+1;
   $("h1").text("Level "+level);
 }
 function checkAnswer(currentlevel){
   if(userClickedPattern[currentlevel-1]===gamePattern[currentlevel-1]){
     if(currentlevel===level){
       setTimeout(function(){nextSequence()},1000);
     }
   }else{
      var endaudio = new Audio("sounds/wrong.mp3");
      endaudio.play();
      $("body").addClass("game-over");
      $("h1").text("Game over press any key to restart");


      setTimeout(function(){$("body").removeClass("game-over");},1000);
      Startover();
   }

 }
 function Startover(){
   started=false;
   level=0;
 gamePattern =[];
 }
 function playSound(color){
   var audio = new Audio("sounds/"+color+".mp3");
   audio.play();
 }
 function animatePress(color){
$("#"+color).addClass("pressed");
setTimeout(function(){$("#"+color).removeClass("pressed");},100);

 }
$(document).keydown(function(){
  if(started===false){
    started=true;
  $("h1").text("Level "+level);
nextSequence();
}
});

$(".btn").click(function(){
  userPresses=userPresses+1;
  var userChosenColor=$(this).attr("id");

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userPresses);

});
