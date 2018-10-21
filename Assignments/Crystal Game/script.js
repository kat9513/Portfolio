$(document).ready(function() {

//computer chooses random number between 19 and 120
var lowEnd = 19;
var highEnd = 120;
var randomnumber = [];
while(lowEnd <= highEnd) {
    randomnumber.push(lowEnd++);
}

var computerChoice = randomnumber[Math.floor(Math.random()*randomnumber.length)];
console.log("computer chose " + computerChoice);


//variables hold wins, losses, and user score

var wins = 0;
var losses = 0;
var total = 0;

//var for references in html where we want to display things

var computerNumber = document.getElementById("computerchoice");
var winsText = document.getElementById("wins");
var lossesText = document.getElementById("losses");
var totalScore = document.getElementById("total");

//assigning random values to cyrstals between 1 and 12
var lowEnd = 1;
var highEnd = 12;
var crystalNumber = [];
while(lowEnd <= highEnd) {
    crystalNumber.push(lowEnd++);
};

var crystalValue = [];
var images = document.getElementsByClassName("crystal-image");

function reset(){
    computerChoice = randomnumber[Math.floor(Math.random()*randomnumber.length)];
    console.log("computer chose " + computerChoice);
    computerNumber.textContent = computerChoice;
    total = 0;
    for(var i = 0; i<4; i++) {
        crystalValue[i] = crystalNumber[Math.floor(Math.random()*crystalNumber.length)];
        console.log("crystal value " + crystalValue[i]);
        images[i].setAttribute("data-crystalvalue", crystalValue[i]);
        images[i].width = "125"; 
        };

}

//assign different values to each image using a four loop
for(var i = 0; i<4; i++) {
crystalValue[i] = crystalNumber[Math.floor(Math.random()*crystalNumber.length)];
console.log("crystal value " + crystalValue[i]);
images[i].setAttribute("data-crystalvalue", crystalValue[i]);
images[i].width = "125"; 
};

var crystalImage = $(".crystal-image");
//crystalImage.attr("data-crystalvalue", crystalValue);

crystalImage.on("click", function(){
console.log($(this).attr("data-crystalvalue"));
console.log(total+=parseInt($(this).attr("data-crystalvalue")));
//if statementss
if (total === computerChoice) {
    wins++;
    winsText.textContent = "wins " + wins;
    reset();
    alert("You win!");}
else if (total > computerChoice) {
    losses++;
    lossesText.textContent = "losses " + losses;
    reset();
    alert("You lose!");}
totalScore.textContent = "Your total score is: " + total;

});



//add text content to page
computerNumber.textContent = computerChoice;


});
