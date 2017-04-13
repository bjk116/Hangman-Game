var hangmanWordBank = {
	"Nirvana":["Smells Like Teen Spirit", "assets/images/Nirvana.jpg"],
	"Britney Spears":["Hit Me Baby One More Time", "assets/images/BirtneySpears.jpg"],
	"Bush":["Glyercine", "assets/images/Bush.jpg"],
	"Goo Goo Dolls":["Iris", "assets/images/GooGooDolls.jpg"],
	"SmashMouth":["All Star", "assets/images/Smashmouth.jpg"],
	"Metallica":["Enter Sandman", "assets/images/Metallica.jpg"],
	"The Gin Blossoms":["Hey Jealousy", "assets/images/TheGinBlossoms.jpg"],
	"Backstreet Boys": ["I Want it That Way", "assets/images/BackstreetBoys.jpg"],
	"Shaggy": ["Wasn't Me", "assets/images/Shaggy.jpg"],
	"Destinys Child": ["Say My Name", "assets/images/DesintysChild.jpg"],
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
			console.log(guessA[z]);	
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
		if(wordGuessarr[i]==' '){
			guessArr[i]=true;
		} else {
		guessArr[i]=false;
		}
	}
	console.log(guessArr);
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

function letterInWord(letter, word){
	console.log('checking letter in word');
	for (var i=0; i<word.length; i++) {
		if(word[i].toLowerCase()==letter){
			console.log('word[i]='+word[i]+'letter='+letter);
			return true;
		}
	}
	return false;
}

function lost(guessesLeft) {
	if(guessesLeft==0) {
		return true;
	} else {
		return false;
	}
}

function alreadyGuessed(letter, guessed) {
	var guess=false;
	console.log("checking if guessed");
	for(var i=0;i<guessed.length;i++) {
		if(guessed[i]==letter) {
			console.log('already guessed!');
			guess=true;
		}
	}

	return guess;
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
var image;

document.onkeyup = function (event) {
 	specialKey = event.keyCode;//for checking enter, spacebar
	pressedKey = event.key;
	pressedKey=pressedKey.toLowerCase();
	console.log('start');

	//Start/retstart word, pick word, reset boolean variables and necessary resets
	if(specialKey==13 && started===false){ //only runs first time when wins=losses=0, and presses enter
		console.log('first run, restsarting word');
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
		$('#guessesLeft').html('Guesses: '+allowedGuesses);
	} else if (specialKey<46 || specialKey>91) { //Not counting non-alphetbet choices
		alert("Please choose a letter");
	} else if(letterInWord(pressedKey, wordToGuess)) {//checking if key press is acutally in the word
		if(alreadyGuessed(pressedKey, lettersGuessed)) {
			//do nothing
		} else {
			guessArr=updateGuessArray(pressedKey,guessArr,wordToGuess);//update boolean array
			lettersGuessed.push(pressedKey); //Keeping track of guessed letters
			hiddenWord=displayHiddenWord(guessArr, wordToGuess);
			$('#word').html(hiddenWord);
			win=checkWin(guessArr);
			$('#guessedLetters').html(lettersGuessed.join(', '));
		}
	} else {
		console.log('Letter not in Word');
		if (alreadyGuessed(pressedKey, lettersGuessed)) {
			console.log('already guessed!');
		} else {
			lettersGuessed.push(pressedKey); //Keeping track of guessed letters
			allowedGuesses--;
			displayHiddenWord(guessArr, wordToGuess);
			lose=lost(allowedGuesses);
			console.log('Lost?: '+lose);
			$('#guessesLeft').html('Guesses: '+allowedGuesses);
			$('#guessedLetters').html(lettersGuessed.join(', '));
		}
	}

	if(win) {
		alert('You won!');
		wins++;
		$('#titleOfSong').html(hangmanWordBank[band][0] + " By " + band);
		$('#wins').html('Wins :'+wins);
		console.log('starting new word');
	//changeimage
		image=hangmanWordBank[band][1];
		$('#winImage').attr('src',image);
	//restarting game conditions, create new word and guesses
		console.log("won, restarting word");
		wordToGuess=pickRandomWord(hangmanWordBank);
		band=wordToGuess;
		wordToGuess=wordToGuess.split('');
		guessArr=createBoolWord(wordToGuess);
		allowedGuesses=Math.max(Math.min(Math.floor(wordToGuess.length*.8),10), 6);
		lettersGuessed=[];
	//show new word, guesses
		hiddenWord=displayHiddenWord(guessArr, wordToGuess);
		console.log(hiddenWord);
		$('#word').html(hiddenWord);
		$('#guessesLeft').html("Guesses: "+allowedGuesses);
		$('#guessedLetters').html(lettersGuessed.join(', '));
		win=false;//reset win value
		console.log(hangmanWordBank[band][1]);
	}
	if (lose){
		losses++;
		$('#losses').html("Losses: "+losses);
	//restarting game conditions, create new word and guesses
		console.log("lost, restarting word");
		wordToGuess=pickRandomWord(hangmanWordBank);
		band=wordToGuess;
		wordToGuess=wordToGuess.split('');
		guessArr=createBoolWord(wordToGuess);
		allowedGuesses=Math.max(Math.min(Math.floor(wordToGuess.length*.8),10), 6);
		lettersGuessed=[];
	//show new word
		hiddenWord=displayHiddenWord(guessArr, wordToGuess);
		console.log(hiddenWord);
		$('#word').html(hiddenWord);
		$('#guessesLeft').html("Guesses: "+allowedGuesses);
		$('#guessedLetters').html(lettersGuessed.join(', '));
		lose=false;//reset lose value
	}
	

	

	//tally for missed guesses/good guesses appropriately
	//check if win
		//if win, tally win, change title/image and play song and start at beginning of loop
		//if loss, tally loss, and start at beginning of loop
}