import { createContext, useEffect } from "react";
import useWordle from "../hooks/useWordle";

import Board from "./Board";

export const WordleContext = createContext();

function Wordle() {
  const {
    attempt,
    currentGuess,
    previousGuesses,
    isLoading,
    error,
    gameState,
  } = useWordle();

  return (
    <WordleContext.Provider
      value={{
        attempt,
        currentGuess,
        previousGuesses,
        gameState,
        error,
        isLoading,
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <h1>MADE BY Siddharth FOR MPAC Technical Assessment</h1>
        <ul>
          <li>1. Reload the page to play again</li>
          <li>
            {"2. Use keyboard to enter values (Enter, Backspace, a-zA-Z)"}
          </li>
        </ul>
        {gameState === "won" && <p>Congratulations! You've won the game!</p>}
        {gameState === "lost" && <p>Game Over. Try again!</p>}
        {isLoading && <div>Loading...</div>}
        <Board />
      </div>
    </WordleContext.Provider>
  );
}

export default Wordle;
