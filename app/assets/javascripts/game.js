$(document).ready(function() {
	$('#winner').hide();
	$('#reset').hide();
	play();
	reset();
});

var play = function() {
	var player = "o";
	var	moves = 0;
	var grid = $('.square');
	var winner;
	$('.square').on("click", function() {
		var gridContents = [];

		if (validMove($(this))) {

			$(this).html(player);
			$(this).addClass(player);

			grid.each(function() {
				gridContents.push($(this).html());
			})

			if (columnWin(gridContents, player) != undefined) {
				winner = columnWin(gridContents, player)
			}
			else if (rowWin(gridContents, player) != undefined) {
				winner = rowWin(gridContents, player)
			}
			else if (leftRightWin(gridContents, player) != undefined) {
				winner = leftRightWin(gridContents, player)
			}
			else if (rightLeftWin(gridContents, player) != undefined) {
				winner = rightLeftWin(gridContents, player)
			}

			player = player == 'x' ? 'o' : 'x';
			moves += 1;

			if (moves < 10 && winner != undefined) {
				$('#winner').show().html(winner.toUpperCase() + " wins the game!");
				$('#reset').show().html("Play again");
				return false;
			}
			else if (moves == 9 && winner == undefined) {
				$('#winner').html("It's a tie!");
				$('#reset').html("Play again");
				return false;
			};

		}

	})
};

var rowWin = function(array, p) {
	for (var i=0, group=3; i<array.length; i+=3) {
		if (array.slice(i, i+group).every(elem => elem == p)) {
			return p;
		}
	};
};

var columnWin = function(array, p) {
	var columnArray=[];
	for (var i=0; i<3; i++) {
		columnArray.push([array[i], array[i+3], array[i+6]]);
	};
	for (var column in columnArray) {
		if (columnArray[column].every(elem => elem == p)) {
			return p;
		}
	};
};

var leftRightWin = function(array, p) {
	var diagonalArray=[];
	for (var i=0; i<array.length; i+=4) {
		diagonalArray.push(array[i]);
		if (!diagonalArray.includes("") && diagonalArray.length == 3 && diagonalArray.every(elem => elem == p)) {
			return p;
		}
	}
}

var rightLeftWin = function(array, p) {
	var diagonalArray=[];
	for (var i=2; i<7; i+=2) {
		diagonalArray.push(array[i]);
		if (!diagonalArray.includes("") && diagonalArray.length == 3 && diagonalArray.every(elem => elem == p)) {
			return p;
		}
	}
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
	$('#reset').on("click", function() {
		$('.square').off("click", function() {
			console.log("working");
		})
		$('#winner').hide();
		$('#reset').hide();
		$('square').removeClass("x");
		$('square').removeClass("o");
		$('square').empty();
		play();
	})
}

// Make alert that game is over and start new game