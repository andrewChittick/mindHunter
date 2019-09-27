/*******************************************************
 TITLE: mindhunter.js
 AUTHoR: Andrew P Chittick (APC)
 CREATE DATE: 9/2/19
 PURPOSE: tracks progress and updates menu of game
 	contains different links for different states of game
*******************************************************/

/***********************************************
Purpose: sets the colors of buttons and availability
	of levels based on progress.  
Parameters: uses localStorage string variables-
	bill, wendy, holden, intro, ed, hannibal, dexter
Return: N/A
***********************************************/
function setMenu(){
	//bill
	if (localStorage.getItem("bill")=="complete"){
		$("#bill").css("background-color", "darkGreen");
	}
	//wendy
	if (localStorage.getItem("wendy")=="complete"){
		$("#wendy").css("background-color", "darkGreen");
	}
	//holden
	if (localStorage.getItem("holden")=="complete"){
		$("#holden").css("background-color", "darkGreen");
	}
	//intro
	if (localStorage.getItem("intro")=="complete"){
		$("#ed").html("Ed Kemper")
			.attr("onclick", "window.location.href= 'ed/ed.html';")
			.css({
				"background-color": "gray",
				"color":"darkRed"
			});
		$("#edPic").attr("src", "images/edCartoon.png");
	}
	//ed
	if (localStorage.getItem("ed")=="complete"){
		$("#ed").css("background-color", "darkGreen");

		$("#hannibal").html("Hannibal Lecter")
			.attr("onclick", "window.location.href= 'hannibal/hannibal.html';")
			.css({
				"background-color": "gray",
				"color":"darkRed"
			});
		$("#hannibalPic").attr("src", "images/hannibalCartoon.png");
	}
	//hannibal
	if (localStorage.getItem("hannibal")=="complete"){
		$("#hannibal").css("background-color", "darkGreen");

		$("#dexter").html("Bay Harbor Butcher")
			.attr("onclick", "window.location.href= 'dexter/dexter.html';")
			.css({
				"background-color": "gray",
				"color":"darkRed"
			});
		$("#dexterPic").attr("src", "images/dexterCartoon.png");
	}
	//dexter
	if (localStorage.getItem("dexter")=="complete"){
		$("#dexter").css("background-color", "darkGreen");
	}
}

/***********************************************
Purpose: Sets localStorage variable to "complete" 
Parameters: levelName: string name of a level
Return: N/A
***********************************************/
function win(levelName){
	//level completed
	localStorage.setItem(levelName, "complete");
	//test if intro is complete, if not already
	if (localStorage.getItem("intro") != "complete"){
		if (localStorage.getItem("bill")=="complete" && localStorage.getItem("wendy")=="complete" && localStorage.getItem("holden")=="complete"){
			localStorage.setItem("intro", "complete");//intro completed
		}
	}
}

/***********************************************
Purpose: clears localStorage and reloads page
Parameters: N/A
Return: N/A
***********************************************/
function reset(){
		//clear storage
		localStorage.clear();
		//reset css
		location.reload();
}

/***********************************************
Purpose: sets localStorage var breakfast to 'yes' or 'no'
Parameters: yesNo- a string- 'yes' or 'no'
Return: N/A
***********************************************/
function breakfast(yesNo){
	localStorage.setItem("breakfast", yesNo);
	window.location = 'office.html';
}

/***********************************************
Purpose: for bill level, links to appropriate page 
	based on localStorage var breakfast
Parameters: N/A
Return: N/A
***********************************************/
function neglect(){
	if (localStorage.getItem("breakfast") == "yes"){
		//no die
		window.location = 'win.html';
	}
	else{
		//die
		window.location = 'lose.html';
	}
}

/***********************************************
Purpose: for dexter level, links to appropriate page 
	based on localStorage var breakfast
Parameters: N/A
Return: N/A
***********************************************/
function neglectDexter(){
	if (localStorage.getItem("breakfast") == "yes"){
		//no die
		localStorage.setItem("tench", "yes");
		window.location = 'officeTench.html';
	}
	else{
		//die
		window.location = 'tenchLose.html';
	}
}

/***********************************************
Purpose: for dexter level, resets tench variable
Parameters: N/A
Return: N/A
***********************************************/
function clearTench(){
	localStorage.removeItem("tench");
}

/***********************************************
Purpose: for dexter level; links to appropriate page
	based on bill availability
Parameters: N/A
Return: N/A
***********************************************/
function mansonLink(){//tench
	if (localStorage.getItem("tench") == "yes"){
		window.location = '../dexter/dilemaTench.html';
	}
	else{//no tench
		window.location = '../dexter/tenchReturn.html';
	}
}

/***********************************************
Purpose: for dexter level; links to appropriate page
	based on bill availability
Parameters: N/A
Return: N/A
***********************************************/
function dexterLink(){//tench
	if (localStorage.getItem("tench") == "yes"){
		window.location = '../dexter/officeTench.html';
	}
	else{//no tench
		window.location = '../dexter/office.html';
	}
}

/***********************************************
Purpose: for dexter level; links to appropriate page
	based on bill availability
Parameters: N/A
Return: N/A
***********************************************/
function dexterMorganLink(){//tench
	if (localStorage.getItem("tench") == "yes"){
		window.location = '../dexter/leoTench.html';
	}
	else{//no tench
		window.location = '../dexter/leo.html';
	}
}


/**********************************************************
 * game over animation below
 *
 * Purpose: changes the background color of the level div
 * after the game is won
 *
 *********************************************************/
var r, rInc;
var g, gInc;
var b, bInc;
var keepBowing;
var colorCode;

function champ(){
	//'dexter' level complete
	win("dexter");

	 //reset variables
	keepBowing=true;
	colorCode=Number(0);

	r=Number(160);
	rInc=Number(-1);
	g=Number(160);
	gInc=Number(0);
	b=Number(160);
	bInc=Number(0);

	rainbow();
}
function rainbow(){
	//test and change color
	testColor();
	//increment colors
	r+=rInc;
	g+=gInc;
	b+=bInc;
	//go on?
	if (keepBowing==true){//yup
		setTimeout(rainbow, 15);
	}
}
function testColor(){
    //colorCode
    //start-0 -1 -2 -3 -4 -5 -6   -7
    //  rgb-gb-g -rg-r -rb-b -blk-rgb
    switch(colorCode){
        case 0://gb
            if(r<0){
                colorCode++;
                rInc=Number(0);
                gInc=Number(0);
                bInc=Number(-1);
            }
            else{
                changeColor();
            }
            break;
        case 1://g
            if(b<0){
                colorCode++;
                rInc=Number(1);
                gInc=Number(0);
                bInc=Number(0);
            }
            else{
                changeColor();
            }
            break;
        case 2://rg
            if(r>255){
                colorCode++;
                rInc=Number(0);
                gInc=Number(-1);
                bInc=Number(0);
            }
            else{
                changeColor();
            }
            break;
        case 3://r
            if(g<0){
                colorCode++;
                rInc=Number(0);
                gInc=Number(0);
                bInc=Number(1);
            }
            else{
                changeColor();
            }
            break;
        case 4://rb
            if(b>255){
                colorCode++;
                rInc=Number(-1);
                gInc=Number(0);
                bInc=Number(0);
            }
            else{
                changeColor();
            }
            break;
        case 5://b
            if(r<0){
                colorCode++;
                rInc=Number(0);
                gInc=Number(0);
                bInc=Number(-1);
            }
            else{
                changeColor();
            }
            break;
        case 6://black
            if(b<0){
                colorCode++;
                rInc=Number(1);
                gInc=Number(1);
                bInc=Number(1);
            }
            else{
                changeColor();
            }
            break;
        case 7://rgb
            if(r>255){//rainbow done
                keepBowing=false;
            }
            else{
                changeColor();
            }
            break;
    }
}
function changeColor(){
    	//updates color
	var level = document.getElementById("level");
    	level.style.backgroundColor="rgb("+r+","+g+","+b+")";
}
