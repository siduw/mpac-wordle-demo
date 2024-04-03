import { useContext } from "react";

import Row from "./Row";

import { WordleContext } from "./Wordle";

function Board() {
  const { attempt, currentGuess, previousGuesses } = useContext(WordleContext);
  return (
    <div className="flex flex-col">
      {previousGuesses.map((guess, index) => {
        if (attempt === index) {
          return <Row key={index} currentGuess={currentGuess} />;
        }
        return <Row key={index} guess={guess} />;
      })}
    </div>
  );
}

export default Board;
