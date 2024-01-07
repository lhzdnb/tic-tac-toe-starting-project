import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

import { PLAYERS } from "./config.js";
import { deriveWinner, deriveActivePlayer, deriveGameBoard } from "./helper.js";

function App() {
  const [players, setPlayers] = useState(PLAYERS);

  // const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const draw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((activePlayer) => (activePlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handleNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleNameChange}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
