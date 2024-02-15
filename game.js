var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];  // game pattern will be stored here

var userClickedPattern=[];   // user clicked pattern will be stored here

var started=false;
var level=0;


// when user presses any key on keyboard
$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;

    }
});


// for gameplay using mouse click
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


// for creating sequence
function nextSequence(){

    userClickedPattern=[];
    level++;

    $("#level-title").text("Level "+level);

    var randomNumber=Math.round(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
   
}


// for checking if answer is right or wrong
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Wrong");
        var wrongSound="wrong";
        playSound(wrongSound);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart.");
        startOver();
    }
    
}

// for playing sound on click
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

// for animation on click
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

// for starting again if answer went wrong
function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}


