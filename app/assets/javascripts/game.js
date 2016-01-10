$(document).ready(function() {
	var x = "x";
	var	o = "o";
	var player = "o";
	var	moves = 0;
	// var wins: [["one", "two", "three"], ["four", "five", "six"], ["seven"]]
	$('.square').click(function() {
		if ($(this).html() === "") { // Only record moves made on empty squares
			$(this).html(player); // Add symbol to square on screen
			$(this).addClass(player); // Record owner in class
			if (player == o) {
				player = x; // Toggle player player
			}
			else {
				player = o;
			};
			moves += 1;
			console.log(player);
			console.log(moves);
		}
		else {
			alert("Oops! Space is already taken");
		}
	})
})

// Make alert that game is over and start new game
// Account for ties