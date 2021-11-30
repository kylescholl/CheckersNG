angular
	.module("checkersNG", [])
	.controller("checkersController", function ($scope, $timeout) {
		let C_P1 = "#D1603D",
			C_P2 = "#808080",
			C_BLACK = "#221D23",
			C_WHITE = "#EEEEEE";
		let P1 = "Orange",
			P2 = "Black";
		let BOARD_WIDTH = 8;
		let base = null;
		let isMoving = false;

		function Piece(player, x, y) {
			this.player = player;
			this.x = x;
			this.y = y;
			this.isChoice = false;
			this.myList = [];
		}

		$scope.newGame = function () {
			$scope.playerturn = P1;
			$scope.scoreP1 = 0;
			$scope.scoreP2 = 0;
			$scope.board = [];
			isMoving = false;

			for (let row = 0; row < BOARD_WIDTH; row++) {
				$scope.board[row] = [];
				for (let col = 0; col < BOARD_WIDTH; col++) {
					if (
						(row === BOARD_WIDTH - 2 && col % 2 === 0) ||
						(row === BOARD_WIDTH - 1 && col % 2 === 1)
					) {
						$scope.board[row][col] = new Piece(P1, col, row);
					} else if (
						(row === 0 && col % 2 === 0) ||
						(row === 1 && col % 2 === 1)
					) {
						console.log(col, row);
						$scope.board[row][col] = new Piece(P2, col, row);
					} else {
						$scope.board[row][col] = new Piece(null, col, row);
					}
				}
			}
		};

		// Manually call at game load / startup
		$scope.newGame();

		// Player Piece Coloring
		var counter_ = 0;
		$scope.setStyling = function (square) {
			// console.log(counter_);
			if (square.player === P1) {
				counter_++;
				return { backgroundColor: C_P1 };
			} else if (square.player === P2) {
				counter_++;
				return { backgroundColor: C_P2 };
			} else {
				counter_++;
				return { backgroundColor: "none" };
			}
		};

		// ! May need to remove
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
					// let moves = getMoves(square);
					// Highlight playable moves
					// showMoves(moves);
					// Reset variables
					isMoving = true;
				}
			} else {
				// Mid Turn
				console.log("\nMID TURN");
				console.log(square);
				checkMove(square);
			}
			try {
				$scope.base_ = `{player: ${base.player}, x: ${base.x}, y: ${base.y}}`;
			} catch (error) {}
		};

		$(document).ready(function () {
			const divs = document.getElementsByClassName("square");
			let index = 0;
			for (let row = 0; row < BOARD_WIDTH; row++) {
				for (let col = 0; col < BOARD_WIDTH; col++) {
					const id = `x${col}-y${row}`;
					divs[index].id = id;
					index++;
				}
			}
		});

		// Check if selected move is legal
		function checkMove(destination) {
			// console.log("$scope.board");
			// console.log($scope.board);
			console.log($scope.board[destination.y][destination.x]);

			let FL, JL, FR, JR;
			// dynamically set depending on $scope.playerturn
			if ($scope.playerturn == P1) {
				console.log(P1);
				FL = { x: base.x - 1, y: base.y - 1 };
				JL = { x: base.x - 2, y: base.y - 2 };
				FR = { x: base.x + 1, y: base.y - 1 };
				JR = { x: base.x + 2, y: base.y - 2 };
			} else {
				console.log(P2);
				FL = { x: base.x + 1, y: base.y + 1 };
				JL = { x: base.x + 2, y: base.y + 2 };
				FR = { x: base.x - 1, y: base.y + 1 };
				JR = { x: base.x - 2, y: base.y + 2 };
			}

			try {
				if (destination.player == null) {
					// Check Left Normal
					if (FL.x == destination.x && FL.y == destination.y) {
						console.log("FL");
						doMove(base, destination, null);
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
							changeTurn();
						}
					}

					// Check Right Normal
					if (FR.x == destination.x && FR.y == destination.y) {
						console.log("FR");
						doMove(base, destination, null);
						changeTurn();
					}
					// Check Right Jump
				}

				// TODO: Check if against/near wall
			} catch (error) {
				console.error(error);
			}
		}

		// Execute the Player's Move
		function doMove(start_, end_, toDestroy_) {
			let start_row = start_.y;
			let start_col = start_.x;

			let end_row = end_.y;
			let end_col = end_.x;

			try {
				$scope.board[end_row][end_col] = new Piece(
					$scope.playerturn,
					end_col,
					end_row
				);
				$scope.board[start_row][start_col] = new Piece(
					null,
					start_col,
					start_row
				);
				if (toDestroy_) {
					switch ($scope.playerturn) {
						case P1:
							$scope.scoreP1 = parseInt($scope.scoreP1) + 1;
							break;
						case P2:
							$scope.scoreP2 = parseInt($scope.scoreP2) + 1;
							break;
						case null:
							break;
						default:
							break;
					}

					const destroy_row = toDestroy_.y;
					const destroy_col = toDestroy_.x;

					$scope.board[destroy_row][destroy_col] = new Piece(
						null,
						destroy_col,
						destroy_row
					);
				}
			} catch (error) {
				console.log(error);
			}
			console.log($scope.board);
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
			base = null;
			isMoving = false;
			switch ($scope.playerturn) {
				case P1:
					$scope.playerturn = P2;
					break;
				case P2:
					$scope.playerturn = P1;
					break;
				default:
					break;
			}
		}

		$scope.resetChoice = function () {
			base = null;
		};
	});
