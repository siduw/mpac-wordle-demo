import { WORD_LENGTH } from "../utilities/constants";
import LetterBox from "./LetterBox";

function Row({ guess, currentGuess }) {

  let rowClassNames = "flex flex-row m-2 "

  if (guess) {
    return (
      <div className={rowClassNames}>
        {guess.word.split("").map((letter, index) => {
          return (
            <LetterBox key={index} letter={letter} score={guess.score[index]} />
          );
        })}
      </div>
    );
  } else if (currentGuess) {
    const letters = currentGuess.split("");

    return (
      <div className={rowClassNames}>
        {letters.map((letter, index) => {
          return <LetterBox key={index} letter={letter} />;
        })}
        {[...Array(WORD_LENGTH - letters.length)].map((val, index) => {
          return <LetterBox letter="" key={index} />;
        })}
      </div>
    );
  }
  return (
    <div className={rowClassNames}>
      <LetterBox letter="" />
      <LetterBox letter="" />
      <LetterBox letter="" />
      <LetterBox letter="" />
      <LetterBox letter="" />
    </div>
  );
}

export default Row;
