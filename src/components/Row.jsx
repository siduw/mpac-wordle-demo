import React from "react";
import { WORD_LENGTH } from "../utilities/constants";
import Letter from "./Letter";

const Row = React.memo(({ guess, currentGuess = "" }) => {
  // MERGE LOGIC FOR RENDERING GUESSES AND THE CURRENT GUESS
  const letters = guess ? guess.word.split("") : currentGuess.split("");
  const scores = guess ? guess.score : [];

  return (
    <div className="flex flex-row m-2">
      {Array.from({ length: WORD_LENGTH }, (ele, index) => (
        <Letter
          key={index}
          letter={letters[index] || ""}
          score={scores[index]}
        />
      ))}
    </div>
  );
});

export default Row;
