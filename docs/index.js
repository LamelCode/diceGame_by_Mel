window.addEventListener("load", function() {
  document.querySelector(".playerDetails").classList.add("disableDiv");
  document.querySelector(".playgound").classList.add("disableDiv");
});

function enablePlay() {
  document.querySelector(".quest-sec").classList.add("disableDiv");
  document.querySelector(".title").textContent = "GOoooo!!";
  document.querySelector(".playerDetails").classList.remove("disableDiv");
}

var playerSelected;
function playerSelected(playerName) {
  playerSelected = playerName;
}

document.querySelector(".playerForm").addEventListener("submit", function(e) {
  //Prevent default behaviour of form submit
  e.preventDefault();
  document.querySelector(".introSec").classList.add("disableDiv");
  document.querySelector(".playgound").classList.remove("disableDiv");
  //get player name and set it in play ground.
  var player = document.querySelector("#player").value;
  document.querySelector("#nameMainPlayer").textContent = player[0].toUpperCase() + player.slice(1);
  // capitalizeFirstLetter(player);

  // create and dynamically set image of opponent
  switch (playerSelected) {
    case "Mary":
      addOppoImg("dice-images/womanWhite.png", "woman2");
      addOpponentNameScore("nameOpponent", playerSelected);
      break;
    case "Nunu":
      addOppoImg("dice-images/womanMuslim.png", "woman2");
      addOpponentNameScore("nameOpponent", playerSelected);
      break;
    case "Ornel":
      addOppoImg("dice-images/woman.png", "woman2");
      addOpponentNameScore("nameOpponent", playerSelected);
      break;
    default:
      addOppoImg("dice-images/womanMuslim.png", "woman2");
      addOpponentNameScore("nameOpponent", "Nunu");
  }

  //Add dice image based on the number of dice chosen
  addDiceImage("diceP1", "img", "d1", "1");
  addDiceImage("diceP2", "img", "d2", "1");
});

function addOppoImg(imgSrc, elementClass) {
  var oppoImage = document.querySelector("." + elementClass);
  oppoImage.setAttribute("src", imgSrc);
  document.querySelector("." + elementClass).classList.add(elementClass);
}

function addOpponentNameScore(elementClass, playerSelected) {
  var oppoName = document.querySelector("#" + elementClass);
  oppoName.textContent = playerSelected;
}

function addDiceImage(parentClass, elementTag, elementClass, diceNumber) {
  // Get Number of dice selected
  var e = document.querySelector("#dice");
  var strUser = e.options[e.selectedIndex].text;
  //insert image = number of dice selected
  for (var i = 1; i <= strUser; i++) {
    var p = document.querySelector("." + parentClass);
    var imageElem = document.createElement(elementTag);
    imageElem.setAttribute("class", elementClass);
    imageElem.setAttribute("src", "dice-images/dice" + diceNumber + ".png");
    p.appendChild(imageElem);
    document.querySelector("." + elementClass).classList.add(elementClass);
  }
}

function capitalizeFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}

//Declare variables for the game counter player1  and player2  to determine the winner based on the rounds.
var countP1 = 0;
var countP2 = 0;
var roundCount = 0;
var roundCounter = 0;
function buttonShake() {
  var winnerP1 = document.querySelector("#player").value;
  var winnerP2 = document.querySelector("#nameOpponent").textContent;
  var sumDice1 = 0;
  var sumDice2 = 0;
  var dice1Result = shakeDice("d1");
  var dice2Result = shakeDice("d2");
  if (dice1Result.length == dice2Result.length) {
    for (var i = 0; i < dice1Result.length; i++) {
      sumDice1 += dice1Result[i];
      sumDice2 += dice2Result[i];
    }
    if (sumDice1 > sumDice2) {
      document.querySelector("#winner-msg").textContent = " 🚩 " +winnerP1[0].toUpperCase() + winnerP1.slice(1) + " " + "Wins";
      countP1++;
      document.querySelector("#points1").textContent = countP1;
    } else if (sumDice1 === sumDice2) {
      document.querySelector("#winner-msg").textContent = "Twinning !!";
    } else {
      document.querySelector("#winner-msg").textContent = winnerP2 + " " + "Wins 🚩";
      countP2++;
      document.querySelector("#points2").textContent = countP2;
    }
    roundCount++;
    if (roundCount == 10) {
      if (countP1 > countP2) {
        document.querySelector("#winner-msg").textContent = "Round Winner:" + " " + winnerP1;
      } else if(countP1 == countP2) {
        document.querySelector("#winner-msg").textContent = "Oppsss! no winner";
      } else {
        document.querySelector("#winner-msg").textContent = "Round Winner:" + " " + winnerP2;
      }
      roundCounter++
      document.querySelector("#round").textContent = roundCounter ;
      countP1 = 0;
      countP2 = 0;
      roundCount = 0;
    }
  }
}

//Method sets the image based on random value stored in the arrRandomDiceNum
function shakeDice(elemclass) {
  imageElems = document.querySelectorAll("." + elemclass);
  var arrRandomDiceNum = [];
  if (imageElems !== null || imageElems !== "") {
    for (var i = 0; i < imageElems.length; i++) {
      arrRandomDiceNum.push(Math.floor(Math.random() * 6) + 1)
      imageElems[i].setAttribute("src", "dice-images/dice" + arrRandomDiceNum[i] + ".png");
    }
  }
  return arrRandomDiceNum;
}
