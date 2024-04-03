import Row from "./Row";

function Board({ attempt, currentGuess, previousGuesses }) {
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
