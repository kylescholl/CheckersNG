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
			$scope.playerturn = P1;
			$scope.scoreP1 = 0;
			$scope.scoreP2 = 0;
			$scope.board = [];
			isMoving = false;

			for (let i = 0; i < BOARD_WIDTH; i++) {
				$scope.board[i] = [];
				for (let j = 0; j < BOARD_WIDTH; j++) {
					// Player 1
					if (
						(i === BOARD_WIDTH - 2 && j % 2 === 0) ||
						(i === BOARD_WIDTH - 1 && j % 2 === 1)
					) {
						$scope.board[i][j] = new Piece(P1, j, i);
					} else if (
						(i === 0 && j % 2 === 0) ||
						(i === 1 && j % 2 === 1)
					) {
						console.log(j, i);
						$scope.board[i][j] = new Piece(P2, j, i);
					} else {
						$scope.board[i][j] = new Piece(null, j, i);
					}
				}
			}

			// TODO: assign each space an id with xy coords
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
			console.log("");
			if (!isMoving) {
				if (square.player === $scope.playerturn) {
					// New Turn
					console.log("\nNEW TURN");
					console.log(square);
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
				// Mid Turn
				console.log("\nMID TURN");
				console.log(square);
				checkMove(square);
			}
		};

		// Check if selected move is legal
		function checkMove(destination) {
			console.log("$scope.board");
			console.log($scope.board);
			console.log($scope.board[destination.y][destination.x]);

			let FL, JL, FR, JR;
			// dynamically set depending on playerturn
			if ($scope.playerturn == P1) {
				console.log(P1);
				FL = { x: base.x - 1, y: base.y - 1 };
				JL = { x: base.x - 2, y: base.y - 2 };
				FR = { x: base.x + 1, y: base.y - 1 };
				JR = { x: base.x + 2, y: base.y - 2 };
			} else {
				console.log(P2);
			}

			try {
				if (destination.player == null) {
					// Check Left Normal
					if (FL.x == destination.x && FL.y == destination.y) {
						console.log("FL");
						doMove("", base, destination);
						// reset turn variables --> next player turn
						changeTurn();
					}
					// Check Left Jump
					if (JL.x == destination.x && JL.y == destination.y) {
						let checkSpace = $scope.board[FL.y][FL.x];
						console.log(checkSpace.player);
						if (
							checkSpace.player != $scope.playerturn &&
							checkSpace.player != null
						) {
							console.log("JL");
						}
					}

					// Check Right Normal
					if (FR.x == destination.x && FR.y == destination.y) {
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
		function doMove(move, base_, end_, destroy_) {
			let base_row = base_.y;
			let base_col = base_.x;
			let end_row = end_.y;
			let end_col = end_.x;

			let base_ref = $scope.board[base_row][base_col];
			let end_ref = $scope.board[end_row][end_col];

			switch (move) {
				case "value":
					break;

				default:
					break;
			}

			// move html img
			// change $scope.board to match change
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
