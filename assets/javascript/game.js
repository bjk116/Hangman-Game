var wordToSongs = {
	"Nirvana":"Smells Like Teen Spirit",
	"Britney Spears":"Hit Me Baby One More Time",

	randomSong: function(){
		var size = Object.keys(this).length-1;
		console.log(size);
		return this[(Math.floor(size * Math.random()))];
	}
};



console.log("Random Word is: " + wordToSongs.randomSong());
//start game
//pick a random word
//figure out number of random guesses allowed based on lenght of word
//create blank spaces
//allow for guesses
	//tally for missed guesses/good guesses appropriately
//check if win
	//if win, tally win, change title/image and play song and start at beginning of loop
	//if loss, tally loss, and start at beginning of loop