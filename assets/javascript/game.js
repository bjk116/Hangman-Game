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
function displayGuessedLetters(guessarr, wordarr){

}

//function to check win condition
function winCondition(arr) {

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

function letterInWord(letter, WordTG){
	for (var i=0;i<WordTG.length;i++) {
		if(WordTG[i].toLowerCase()==letter){
			return true;
		}
	}
	return false;
}

var wordToGuess, pressedKey, correctGuesses, allowedGuesses;
var lettersGuessed=[];
var guessArr=[];
var wins, losses;
var pressedKey;
var specialKey;

document.onkeyup = function (event) {
 	specialKey = event.keyCode;//for checking enter, spacebar
	pressedKey = event.key;
	pressedKey=pressedKey.toLowerCase();

	//Start/retstart word, pick word, reset boolean variables and necessary resets
	if(specialKey===13){
		wordToGuess=pickRandomWord(hangmanWordBank);
		wordToGuess=wordToGuess.split('');
		guessArr=createBoolWord(wordToGuess);
		//figure out number of random guesses allowed based on lenght of word, minimum 6 guesses, max 10
		allowedGuesses=Math.max(Math.min(Math.floor(wordToGuess.length*.8),10), 6);
		console.log(wordToGuess);
		console.log(guessArr[0]);
		console.log(guessArr[1]);
	} else if (specialKey<46 || specialKey>91) { //Not counting non-alphetbet choices
		alert("Please choose a letter");
	} else if(letterInWord(pressedKey, wordToGuess)) {//checking if key press is acutally in the word
		guessArr=updateGuessArray(pressedKey,guessArr,wordToGuess);
		console.log('In Word!');
		console.log(guessArr[0]);
	} else {
		console.log('Letter not in Word');
	}
	

	

	//tally for missed guesses/good guesses appropriately
	//check if win
		//if win, tally win, change title/image and play song and start at beginning of loop
		//if loss, tally loss, and start at beginning of loop
}

wordToGuess=pickRandomWord(hangmanWordBank);