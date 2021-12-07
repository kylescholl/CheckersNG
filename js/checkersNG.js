angular
	.module("checkersNG", [])
	.controller("checkersController", function ($scope, $timeout) {
		const C_P1 = "#D1603D",
			C_P2 = "#808080",
			C_BLACK = "#221D23",
			C_WHITE = "#EEEEEE";

		const P1 = "Orange",
			P2 = "Black";

		const BOARD_WIDTH = 8;
		let isMoving = false;
		let start = null;
		let gameover = false;

		function Piece(player, x, y) {
			this.player = player;
			this.x = x;
			this.y = y;
			this.isKing = false;
			this.selected = false;
		}

		$scope.newGame = function () {
			$scope.playerTurn = P1;
			$scope.scoreP1 = 0;
			$scope.scoreP2 = 0;
			$scope.nameP1 = P1;
			$scope.nameP2 = P2;
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
		$scope.setStyling = function (tile) {
			if (tile.player === P1) {
				return { backgroundColor: C_P1 };
			} else if (tile.player === P2) {
				return { backgroundColor: C_P2 };
			} else {
				return { backgroundColor: "none" };
			}
		};

		// Board Tile Coloring
		$scope.setClass = function (tile) {
			if (tile.y % 2 === 0) {
				if (tile.x % 2 === 0) {
					return { backgroundColor: C_BLACK };
				} else {
					return { backgroundColor: C_WHITE };
				}
			} else {
				if (tile.x % 2 === 1) {
					return { backgroundColor: C_BLACK };
				} else {
					return { backgroundColor: C_WHITE };
				}
			}
		};

		// Player Square Selection
		$scope.select = function (tile) {
			console.log("");
			checkGameover();
			if (gameover === true) {
				// gameover code //
				showGameover();
			} else {
				if (!isMoving) {
					if (tile.player === $scope.playerTurn) {
						// New Turn
						console.log("\nNEW TURN");
						console.log(tile);
						start = tile;
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
					console.log(tile);
					checkMove(tile);
				}
				try {
					$scope.selectedPiece = `{${start.player}, (${start.x}, ${start.y})}`;
				} catch (error) {
					console.error(error);
				}
			}
		};

		// Check if selected move is legal
		function checkMove(end) {
			console.log($scope.board[end.y][end.x]);

			let FL, JL, FR, JR;
			let FL_, JL_, FR_, JR_; // represent going backwards
			// dynamically set depending on $scope.playerTurn
			if ($scope.playerTurn == P1) {
				console.log(P1);
				FL = { x: start.x - 1, y: start.y - 1 };
				JL = { x: start.x - 2, y: start.y - 2 };
				FR = { x: start.x + 1, y: start.y - 1 };
				JR = { x: start.x + 2, y: start.y - 2 };
				if (start.isKing) {
					FL_ = { x: start.x - 1, y: start.y - 1 };
				}
			} else {
				console.log(P2);
				FL = { x: start.x + 1, y: start.y + 1 };
				JL = { x: start.x + 2, y: start.y + 2 };
				FR = { x: start.x - 1, y: start.y + 1 };
				JR = { x: start.x - 2, y: start.y + 2 };
				if (start.isKing) {
					// code
				}
			}

			// TODO: kinging

			try {
				if (end.player == null) {
					// Check Left Normal
					if (FL.x == end.x && FL.y == end.y) {
						console.log("FL");
						doMove(start, end, null);
						changeTurn();
					}
					// Check Left Jump
					if (JL.x == end.x && JL.y == end.y) {
						let checkSpace = $scope.board[FL.y][FL.x];
						console.log(checkSpace.player);
						if (
							checkSpace.player != $scope.playerTurn &&
							checkSpace.player != null
						) {
							console.log("JL");
							doMove(start, end, checkSpace);
							changeTurn();
						}
					}
					// Check Right Normal
					if (FR.x == end.x && FR.y == end.y) {
						console.log("FR");
						doMove(start, end, null);
						changeTurn();
					}
					// Check Right Jump
					if (JR.x == end.x && JR.y == end.y) {
						let checkSpace = $scope.board[FR.y][FR.x];
						console.log(checkSpace.player);
						if (
							checkSpace.player != $scope.playerTurn &&
							checkSpace.player != null
						) {
							console.log("JR");
							doMove(start, end, checkSpace);
							changeTurn();
						}
					}
				}
			} catch (error) {
				//console.error(error);
			}
		}

		// Execute the Player's Move
		function doMove(start_, end_, toDestroy_) {
			const start_row = start_.y,
				start_col = start_.x;
			const end_row = end_.y,
				end_col = end_.x;

			let isKing = false;
			if (
				start_.isKing === true ||
				end_row === 0 ||
				end_row === BOARD_WIDTH - 1
			) {
				console.log("KING");
				isKing = true;
			}
			try {
				$scope.board[start_row][start_col] = new Piece(
					null,
					start_col,
					start_row
				);
				$scope.board[end_row][end_col] = new Piece(
					$scope.playerTurn,
					end_col,
					end_row,
					isKing
				);
				if (toDestroy_) {
					switch ($scope.playerTurn) {
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

		function checkGameover() {
			if ($scope.scoreP1 > 8) {
				console.log(`Gameover: Congratulations ${P1}!`);
			}
			if ($scope.scoreP2 > 8) {
				console.log(`Gameover: Congratulations ${P2}!`);
			}
		}

		function changeTurn() {
			start = null;
			isMoving = false;
			switch ($scope.playerTurn) {
				case P1:
					$scope.playerTurn = P2;
					break;
				case P2:
					$scope.playerTurn = P1;
					break;
				default:
					break;
			}
		}

		function showGameover() {
			// code //
		}

		$scope.resetChoice = function () {
			start = null;
			isMoving = false;
			$scope.selectedPiece = " ";
		};
	});
