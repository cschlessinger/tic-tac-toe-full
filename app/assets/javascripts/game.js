$(document).ready(function() {
	var player = "o";
	var	moves = 0;
	var grid = $('.square');
	var winner;
	var play = function() {
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

				if (winner != undefined) {
					alert(winner);
				}

				player = player == 'x' ? 'o' : 'x';
				moves += 1;
			}

		})
	}
	play();
})

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

// var reset = function() {
// 	$('square').removeClass("x");
// 	$('square').removeClass("o");
// 	moves = 0;
// 	alert("Game over!")
// }

// var endGame = function() {
	// reset();
// }

// Make alert that game is over and start new game
// Account for ties