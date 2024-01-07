import { INITIAL_GAME_BOARD } from "./config.js";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

export function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

export function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];

  gameTurns.forEach((turn) => {
    gameBoard[turn.square.row][turn.square.col] = turn.player;
  });

  return gameBoard;
}

export function deriveWinner(gameBoard, players) {
  let winner = null;
  WINNING_COMBINATIONS.forEach((combination) => {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  });
  return winner;
}
