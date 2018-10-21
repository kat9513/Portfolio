$(document).ready(function() {

//global variables
var questions = ["What kind of animal is Retsuko?","Retsuko takes out her frustration by going to the kareoke bar and singing ____.","Retsuko bonds with two new friends, Washimi and Gori, at ____. ","Retsuko's star sign is _____."];

var answers = [["Raccoon","Red Panda","Cat","Fox"],["ABBA","Country","Adele","Death Metal"],["Sunday Brunch","Work","Yoga Class","The Spa"],["Scorpio","Leo","Aries","Aquarius"]];

var correctAnswers = ["Red Panda","Death Metal","Yoga Class","Scorpio"];

var correctScore = 0;

var incorrectScore = 0;

var count = 0;

var Timer;

var timelimit = 10;

var audio = document.createElement("audio");

audio.setAttribute("src", "assets/Aggretsuko.mp3");

// Create a function that creates the start button and initial screen
function startPage(){
    firstScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $(".Question").html(firstScreen);
}

startPage();


//is it correct or incorrect

function nextQuestion(){
    count++;
    if(count == questions.length) {
        endGame();
    }
    else{
        Question();
    }    

}

function Restart(){
    correctScore = 0;
    incorrectScore = 0;
    count = 0;
    audio.pause();
    Question();
}

function endGame(){
    $("#show-countdown").html("");
    $(".Question").html("GAME OVER")
    $("#1").html("Correct Score: "+correctScore);
    $("#2").html("Incorrect Score: "+incorrectScore);
    $("#3").html("");
    playAgain = "<p class='text-center main-button-container'><a class='btn btn-danger btn-lg btn-block start-button' href='#' role='button'>Play Again</a></p>";
    $("#4").html(playAgain);
    $("#4").off("click").on("click", Restart);
    $("#Aggretsuko").attr("src", "assets/images/AggretsukoRage.png");
    audio.play();
    
    
}

function startTimer(){
    //Timer = setInterval(nextQuestion, 10000);
    timelimit--;
    $("#show-countdown").text(timelimit);
    if(timelimit === 0){
    clearInterval(Timer);
    timelimit=10;
    incorrectScore++;
    nextQuestion();
    }
};


//add functionality to the start button
function Question (){
    $("#Aggretsuko").attr("src", "assets/images/AggretsukoNice.gif");
    $(".Question").html(questions[count]);
    firstButton ="<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>" + answers[count][0] + "</a></p>";
    $("#1").html(firstButton);
    secondButton ="<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>" + answers[count][1] + "</a></p>";
    $("#2").html(secondButton);
    thirdButton ="<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>" + answers[count][2] + "</a></p>";
    $("#3").html(thirdButton);
    fourthButton ="<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>" + answers[count][3] + "</a></p>";
    $("#4").html(fourthButton);
    Timer = setInterval(startTimer, 1000);
   
}
$(".start-button").click(Question);

//generate wins and losses


$(".buttons").on("click", function(event){
var userChoice = $(this).text();
if(userChoice === correctAnswers[count]){
    correctScore ++;
}
    
else{
    incorrectScore++;
}
clearInterval(Timer);
timelimit=10;
nextQuestion();
console.log(correctScore);
console.log(incorrectScore);


})




});