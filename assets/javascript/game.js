var hangmanWordBank = {
	"Nirvana":"Smells Like Teen Spirit",
	"Britney Spears":"Hit Me Baby One More Time",
	"Bush":"Glyercine",
	"Goo Goo Dolls":"Iris",
	"SmashMouth":"All Star",
	"Metallica":"Enter Sandman",
	"The Gin Blossoms":"Hey Jealousy",
	"Backstreet Boys": "I Want it That Way",
	"Shaggy": "Wasn't Me",
	"Destinys Child": "Say My Name",
};

//Ask why this works, not sure - http://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
function pickRandomWord(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
}

//function to display guessed letters
function displayHiddenWord(guessArr, wordArr){
	var dispArr=[];
	for (var i=0; i<wordArr.length;i++) {
		if(wordArr[i]==' ') {
			dispArr.push(' ');
		} else if (guessArr[i]==true) {
			dispArr.push(wordArr[i]);
		} else {
			dispArr.push('_');
		}
	}
	dispArr=dispArr.join(' ');
	return dispArr;
}

//function to check win condition
function checkWin (guessA) {
	var check=0;
	console.log('checking');
	for(var z=0;z<guessA.length;z++) {
		if (guessA[z]==true) {
			check++;	
		}
	}
	console.log(check+"true out of"+guessA.length);
	if(check==guessA.length){
		return true;
	}

	return false;
}

//create array of false spaces for usage when displaying word and win condition
function createBoolWord(wordGuessarr){
	var guessArr=[]; //to reset array from preivous words
	for(var i=0;i<wordGuessarr.length;i++){
		if(wordGuessarr[i]==''){
			guessArr[i]=true;
		} else {
		guessArr[i]=false;
		}
	}
	return guessArr;
}


function updateGuessArray(letter, guessA, wordTG){
	for (var i=0;i<wordTG.length;i++) {
		if(wordTG[i].toLowerCase()==letter) {
			guessA[i]=true;
		}
	}
	return guessA;
}

function letterInWord(letter, WordT){
	for (var i=0;i<WordT.length;i++) {
		if(WordT[i].toLowerCase()==letter){
			return true;
		}
	}
	return false;
}

var wordToGuess, pressedKey, correctGuesses, allowedGuesses;
var lettersGuessed=[];
var guessArr=[];
var wins=0;
var losses=0;
var pressedKey;
var specialKey;
var hiddenWord;
var band;
var winCondition=false;
var started=false;
var win=false;
var lose=false;

document.onkeyup = function (event) {
 	specialKey = event.keyCode;//for checking enter, spacebar
	pressedKey = event.key;
	pressedKey=pressedKey.toLowerCase();


	//Start/retstart word, pick word, reset boolean variables and necessary resets
	if(wins==0 && losses==0 && specialKey==13 && started===false){ //only runs first time when wins=losses=0, and presses enter
		console.log('first run');
		started=true;
		wordToGuess=pickRandomWord(hangmanWordBank);
		band=wordToGuess;
		wordToGuess=wordToGuess.split('');
		guessArr=createBoolWord(wordToGuess);
		//figure out number of random guesses allowed based on lenght of word, minimum 6 guesses, max 10
		allowedGuesses=Math.max(Math.min(Math.floor(wordToGuess.length*.8),10), 6);
		console.log(wordToGuess);
		hiddenWord=displayHiddenWord(guessArr, wordToGuess);
		console.log(hiddenWord);
		$('#word').html(hiddenWord);
		$('#wins').html('Wins: '+wins);
		$('#losses').html('Losses: '+losses);
	} else if (specialKey<46 || specialKey>91) { //Not counting non-alphetbet choices
		alert("Please choose a letter");
	} else if(letterInWord(pressedKey, wordToGuess)) {//checking if key press is acutally in the word
		guessArr=updateGuessArray(pressedKey,guessArr,wordToGuess);
		lettersGuessed.push(pressedKey); //Keeping track of guessed letters
		hiddenWord=displayHiddenWord(guessArr, wordToGuess);
		$('#word').html(hiddenWord);
		win=checkWin(guessArr);
	} else {
		console.log('Letter not in Word');
		lettersGuessed.push(pressedKey); //Keeping track of guessed letters
		displayHiddenWord(guessArr, wordToGuess);
	}

	if(win) {
		alert('You won!');
		wins++;
		$('#titleOfSong').html(hangmanWordBank[band] + " By " + band);
		$('#wins').html('Wins :'+wins);
		console.log('starting new word');
	//restarting game conditions, create new word and guesses
		wordToGuess=pickRandomWord(hangmanWordBank);
		band=wordToGuess;
		wordToGuess=wordToGuess.split('');
		guessArr=createBoolWord(wordToGuess);
		allowedGuesses=Math.max(Math.min(Math.floor(wordToGuess.length*.8),10), 6);
	} else if (lost){
		console.log('no win yet');
	}
	

	

	//tally for missed guesses/good guesses appropriately
	//check if win
		//if win, tally win, change title/image and play song and start at beginning of loop
		//if loss, tally loss, and start at beginning of loop
}