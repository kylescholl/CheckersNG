angular
	.module("checkersNG", [])
	.controller("checkersController", function ($scope, $timeout) {
		let isMoving = false;
		let C_GREY = "#808080",
			C_BLACK = "#221D23",
			C_WHITE = "#EEEEEE",
			C_ORANGE = "#D1603D";
		let P1 = "Orange",
			P2 = "Black",
			BOARD_WIDTH = 8,
			base = null;

		function Piece(player, x, y) {
			this.player = player;
			this.x = x;
			this.y = y;
			this.isKing = false;
			this.isChoice = false;
			this.myList = [];
		}

		$scope.newGame = function () {
			$scope.player = P1;
			$scope.scoreP1 = 0;
			$scope.scoreP2 = 0;
			$scope.board = [];
			isMoving = false;

			for (let i = 0; i < BOARD_WIDTH; i++) {
				$scope.board[i] = [];
				for (let j = 0; j < BOARD_WIDTH; j++) {
					if (
						(i === 0 && j % 2 === 0) ||
						(i === 1 && j % 2 === 1) /*||
                        (i === 2 && j % 2 === 0)*/
					) {
						console.log(j, i);
						$scope.board[i][j] = new Piece(P2, j, i);
					} else if (
						/*(i === BOARD_WIDTH - 3 && j % 2 === 1) ||*/
						(i === BOARD_WIDTH - 2 && j % 2 === 0) ||
						(i === BOARD_WIDTH - 1 && j % 2 === 1)
					) {
						$scope.board[i][j] = new Piece(P1, j, i);
					} else {
						$scope.board[i][j] = new Piece(null, j, i);
					}
				}
			}
		};

		// Manually call at game load / startup
		$scope.newGame();

		// Player Piece Coloring
		$scope.setStyling = function (square) {
			if (square.player === P1) {
				return { backgroundColor: C_ORANGE };
			} else if (square.player === P2) {
				return { backgroundColor: C_GREY };
			} else {
				return { backgroundColor: "none" };
			}
		};

		// Board Tile Coloring
		$scope.setClass = function (square) {
			if (square.y % 2 === 0) {
				if (square.x % 2 === 0) {
					return {
						backgroundColor: square.isChoice ? "green" : C_BLACK,
					};
				} else {
					return { backgroundColor: C_WHITE };
				}
			} else {
				if (square.x % 2 === 1) {
					return {
						backgroundColor: square.isChoice ? "green" : C_BLACK,
					};
				} else {
					return { backgroundColor: C_WHITE };
				}
			}
		};

		// Player Square Selection
		$scope.select = function (square) {
			console.log(square);
			if (!isMoving) {
				let playerTurn = $scope.player;
				if (square.player === playerTurn) {
					// New Turn
					console.log("\nNEW TURN");
					// Assign base
					base = square;
					// Get available moves
					let moves = getMoves(square);
					// Highlight playable moves
					showMoves(moves);
					// Reset variables
					isMoving = true;
				}
			} else {
				// mid turn
				console.log("\nMID TURN");
				checkMove(square);
				resetChoices();
			}
		};

		// Check if selected move is legal
		function checkMove(square) {
			console.log("$scope.board");
			console.log($scope.board);
			console.log($scope.board[square.y][square.x]);

			let FL, JL, FR, JR;
			// set dynamically depending on which player
			if ($scope.player == "Orange") {
				console.log("Orange");
				FL = { x: base.x - 1, y: base.y - 1 };
				JL = { x: base.x - 2, y: base.y - 2 };
				FR = { x: base.x + 1, y: base.y - 1 };
				JR = { x: base.x + 2, y: base.y - 2 };
			} else {
				console.log("Black");
			}

			try {
				if (square.player == null) {
					// Check Left Normal
					if (FL.x == square.x && FL.y == square.y) {
						console.log("FL");
						doMove(base, square);
						// reset turn variables --> next player turn
						changeTurn();
					}
					// Check Left Jump
					if (JL.x == square.x && JL.y == square.y) {
						let checkSpace = $scope.board[FL.y][FL.x];
						console.log(checkSpace.player);
						if (checkSpace.player == null) {
							console.log("FR");
						}
					}
					// Check Right Normal
					if (FR.x == square.x && FR.y == square.y) {
						console.log("FR");
					}
					// Check Right Jump
				}

				// TODO: Check if against/near wall
			} catch (error) {
				console.error(error);
			}
		}

		// Execute the Player's Move
		function doMove(old_, new_) {
			let old_row = old_.y;
			let old_col = old_.x;
			let new_row = new_.y;
			let new_col = new_.x;

			let old_ref = $scope.board[old_row][old_col];
			let new_ref = $scope.board[new_row][new_col];

			// move
			// remove old
			// destroy if needed
		}

		// Returns all playable moves
		function getMoves(square) {
			// FL
			// JL
			// FR
			// JR
		}

		// Shows All Playable Moves
		function showMoves(moves) {
			// code //
		}

		function changeTurn() {
			// code here //
		}

		function resetChoices() {
			// code //
		}
	});
