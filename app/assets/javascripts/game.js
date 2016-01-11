$(document).ready(function() {
	// var x = "x";
	// var	o = "o";
	var gameOver = false;
	var player = "o";
	var	moves = 0;
	var grid = $('.square');
	$('.square').on("click", function() {
		var gridContents = [];

		var rowWin = function() {
			for (var i=0, group=3; i<gridContents.length; i+=3) {
				if (gridContents.slice(i, i+group).every(elem => elem == player)) {
					console.log(player + " win");
				}
			}
		};

		var columnWin = function() {
			var columnArray=[]
			for (var i=0; i<3; i++) {
				columnArray.push([gridContents[i], gridContents[i+3], gridContents[i+6]]);
			}
			for (var column in columnArray) {
				if (columnArray[column].every(elem => elem == player)) {
					console.log(player + " win")
				}
			}
		};

		var diagonalWin = function() {

		}

		if (validMove($(this))) {

			// Update x/o on screen, in classes, and in current player variable
			$(this).html(player);
			$(this).addClass(player);

			grid.each(function() {
				gridContents.push($(this).html());
			})

			columnWin();
			rowWin();

			if (gameOver == true || moves == 9) {
				endGame();
			}

			player = player == 'x' ? 'o' : 'x';
			// checkWin();
			moves += 1;
		}

	})

})



var checkWin = function() {
	rowWin();
	columnWin();
}

var validMove = function(square) {
	if (square.html() === "") {
		return true;
	}
	else {
		alert("Oops! Space is already taken");
		return false;
	}
}

var reset = function() {
	$('square').removeClass(x);
	$('square').removeClass(o);
	moves = 0;
	alert("Game over!")
}

var endGame = function() {
	reset();
}

// Make alert that game is over and start new game
// Account for ties