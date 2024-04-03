import { createContext } from "react";
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
    isFinished,
  } = useWordle();

  console.log(error);

  return (
    <WordleContext.Provider
      value={{
        attempt,
        currentGuess,
        previousGuesses,
        isFinished,
        error,
        isLoading,
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <h1>MADE BY SIDDHARTH FOR MPAC TECHNICAL ASSESSMENT</h1>
        <ul>
          <li>1. Reload the page to play again</li>
          <li>2. Use keyboard to enter values</li>
        </ul>
        {isFinished && (
          <div>
            <p>This game is over</p>
            <p>{attempt < 5 ? "You Won" : "You Lost"}</p>
          </div>
        )}
        <Board />
      </div>
    </WordleContext.Provider>
  );
}

export default Wordle;
