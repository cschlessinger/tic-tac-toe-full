// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {
	$('#reset').hide();
	play();
	reset();
});

var play = function() {
	var player = "o";
	var	moves = 0;
	var grid = $('.square');
	var winner;
	updatePlayer(player);
	$('.square').on("click", function() {
		var gridContents = [];

		if (validMove($(this))) {
			moves += 1;
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
	}
	var rightLeftDiagonalArray=[];
	for (var i=2; i<7; i+=2) {
		rightLeftDiagonalArray.push(array[i]);
		if (!rightLeftDiagonalArray.includes("") && rightLeftDiagonalArray.length === 3 && rightLeftDiagonalArray.every(elem => elem === p)) {
			return true;
		};
	}
};

var updatePlayer = function(p) {
	$("#message").addClass("neutral-background").html(p.toUpperCase() + "'s move");
};

var validMove = function(square) {
	if (square.html() === "") {
		return true;
	} else {
		alert("Oops! Space is already taken");
		return false;
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
		$("#message").removeClass().addClass("neutral-background");
		$(".square").removeClass("x o").empty();
		play();
	})
};