var hangmanWordBank = {
	"Nirvana":"Smells Like Teen Spirit",
	"Britney Spears":"Hit Me Baby One More Time",
	"Bush":"Glyercine",
	"Goo Goo Dolls":"Iris",
	"SmashMouth":"All Star",
	"Metallica":"Enter Sandman",
};


//Keep functions out because it is messing up key count, helper functions
function getWord(){
	var size=Object.keys.length(hangmanWordBank);
	var random = Math.floor( Math.random() * size);
	for (var i in hangmanWordBank) {
			console.log('hangmanWordBank = ' + i + " is " + hangmanWordBank[i]);
	}
}

getWord();
//console.log("Random Word is: " + hangmanWordBank.randomWord());
//start game
//pick a random word
//figure out number of random guesses allowed based on lenght of word
//create blank spaces
//allow for guesses
	//tally for missed guesses/good guesses appropriately
//check if win
	//if win, tally win, change title/image and play song and start at beginning of loop
	//if loss, tally loss, and start at beginning of loop