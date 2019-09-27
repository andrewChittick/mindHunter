//Andrew Chittick
//6/16/18
//Memory
//A simple matching game
//Adapted for Mind hunter the game 9/11/19

//initialize stuff
var colors=["#808080", "#FF0000", "#FF8310", "#00FFD6", 
            "#00FF00", "#0000FF", "#FFF000", "#8F00FF"];
var card=[];
var chosen;
var clicks=0;

//create the board
var board = document.getElementById("board");

//create the cards
for (var i=0; i<16; i++){
    card[i] = document.createElement("div");
    card[i].style.float="left";
    card[i].style.width="50px";
    card[i].style.height="50px";
    card[i].style.margin="10px";
    card[i].style.backgroundColor="#000000";
    //count it
    card[i].cardNumber=i;
    //"put it on the board"-Hawk Harrelson
    board.appendChild(card[i]);
}

//shuffle/deal cards
stackDeck();

function stackDeck(){//shuffles/deals cards
    //empty the cards and listen to them
    for (var i=0; i<16; i++){
        //clear the card
        card[i].cardColor="empty";
        card[i].match=false;
        //listen for clicks
        card[i].addEventListener("click", handleClick); 
    }
    //shuffle deck
    var randomNumber = 0;
    //cycle thru colors
    for (var i=0; i<8; i++){
        var keepGoing = 0;
        while (keepGoing<2){//<2 cards are this color
            //generate random number 0-15
            randomNumber= Math.round(Math.random()*15);
            //assign color to a random unassigned card
            if (card[randomNumber].cardColor=="empty"){
                card[randomNumber].cardColor=colors[i];
                keepGoing++;
            }
        }
    }
}

function handleClick(event){
    //count the click
    clicks++;
    if (clicks==1){//first click
        //show card
        event.target.style.backgroundColor=event.target.cardColor;
        //save the chosen one
        chosen = event.target.cardNumber;
    }
    else if (clicks==2){//second click(no fast clicks)
        //cheater test
        if (card[chosen].cardNumber != event.target.cardNumber){
            //not the same card, show new card
            event.target.style.backgroundColor=event.target.cardColor;
            //compare 2 cards
            if (card[chosen].cardColor == event.target.cardColor){//match
                //remove cards on delay
                setTimeout(function(){clearFlip(chosen, event.target.cardNumber, "#FFFFFF")}, 2000);
                //for checkWinner()'s sake
                card[chosen].match=true;
                event.target.match=true;
                //silence
                card[chosen].removeEventListener("click", handleClick);
                event.target.removeEventListener("click", handleClick);
            }
            else{//not a match
                //flip cards back on delay
                setTimeout(function(){clearFlip(chosen, event.target.cardNumber, "#000000")}, 2000);
            }
        }
        else{//clicked same card twice
            //flip card back
            event.target.style.backgroundColor="#000000";
            //reset clicks
            clicks=0;
        }
    }
}

function clearFlip(cardOne, cardTwo, newColor){
    //clear or flip cards
    card[cardOne].style.backgroundColor=newColor;
    card[cardTwo].style.backgroundColor=newColor;
    //reset clicks
    clicks=0;
    //check for winner
    checkWinner();
}

function checkWinner(){
    var match=0;
    for (var i=0; i<16; i++){
        if (card[i].match==true){
            match++;
        }
    }
    if (match == 16){//we have a winner
        //game won (gate hacked) allow them to continue
        unlock();
    }
}

function unlock(){
	$("#continue").html("Open gate")
		.attr("onclick", "window.location.href= 'capture.html';");
}
