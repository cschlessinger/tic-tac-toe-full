$(document).ready(function() {
	$('#reset').hide();
	ticTacToe();
});

var ticTacToe = function() {

	var	moves = 0;
	var grid = $('.square');
	var winner;
	var player;

	var play = function() {

		// Start game with user's selection of player
		$("#message").addClass("neutral-background").html("Select ").append("<span id='x' class='x pointer selection'>x</span>").append("<span> or </span>").append("<span id='o' class='o pointer selection'> o</span>");
		player = choosePlayer();

			$('.square').on("click", function() {
				var gridContents = [];

				if (validMove($(this))) {
					moves += 1;
					console.log(moves)
					$(this).html(player);
					$(this).addClass(player);

					grid.each(function() {
						gridContents.push($(this).html());
					})

					if (columnWin(gridContents, player) || rowWin(gridContents, player) || diagonalWin(gridContents, player)) {
						winner = player;
					};

					if (winner) {
						winGame(winner);
					}
					else {
						if (moves === 9) {
							$('#message').addClass("neutral-background").html("It's a tie!");
							$('#reset').show()
							$('.square').off("click");
						} else {
							player = player === "x" ? "o" : "x";
							updatePlayer(player);
						}
					};

				}
			})
			
		

		reset();
	};

	var choosePlayer = function() {
		$(".selection").on("click", function() {
			player = $(this).attr("id");
			updatePlayer(player);
		});
	};

	var updatePlayer = function(player) {
		$("#message").addClass("neutral-background").html(player.toUpperCase() + "'s move");
	};

	var validMove = function(square) {
		if (square.html().length === 0) {
			return true;
		} else {
			alert("Oops! Space is already taken");
			return false;
		};
	};

	var rowWin = function(array, p) {
		for (var i=0, group=3; i<array.length; i+=3) {
			if (array.slice(i, i+group).every(elem => elem === p)) {
				return true;
			};
		};
	};

	var columnWin = function(array, p) {
		var columnArray=[];
		for (var i=0; i<3; i++) {
			columnArray.push([array[i], array[i+3], array[i+6]]);
		};
		for (var column in columnArray) {
			if (columnArray[column].every(elem => elem === p)) {
				return true;
			};
		};
	};

	var diagonalWin = function(array, p) {
		var leftRight=[];
		for (var i=0; i<array.length; i+=4) {
			leftRight.push(array[i]);
			if (!leftRight.includes("") && leftRight.length === 3 && leftRight.every(elem => elem === p)) {
				return true;
			};
		};
		var rightLeftDiagonalArray=[];
		for (var i=2; i<7; i+=2) {
			rightLeftDiagonalArray.push(array[i]);
			if (!rightLeftDiagonalArray.includes("") && rightLeftDiagonalArray.length === 3 && rightLeftDiagonalArray.every(elem => elem === p)) {
				return true;
			};
		};
	};

	var winGame = function(winner) {
		if (winner === "x") {
			$('#message').removeClass("neutral-background").addClass("x-background");
		} else {
			$('#message').removeClass("neutral-background").addClass("o-background");
		};
		$('#message').html(winner.toUpperCase() + " wins the game!");
		$('#reset').show();
		$('.square').off("click");
	}

	var reset = function() {
		$("#reset").on("click", function() {
			$(this).hide();
			$("#message").removeClass("x-background o-background").addClass("neutral-background");
			$(".square").removeClass("x o").empty();

			// Call ticTacToe to reset all variables
			moves = 0;
	    grid = $('.square');
	    winner = null;
	    player = null;
	    // play();
		})
	};

	return play();

}
