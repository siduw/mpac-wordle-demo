import useWordle from "../hooks/useWordle";
import Board from "./Board";
import { GAME_STATE } from "../utilities/constants";
import Error from "./Error";

function Wordle() {
  const {
    attempt,
    currentGuess,
    previousGuesses,
    isLoading,
    error,
    gameState,
  } = useWordle();

  const renderGameStatus = () => {
    if (gameState === GAME_STATE.WON) {
      return (
        <p>{`Congratulations! You've won the game on turn: ${attempt}`}</p>
      );
    } else if (gameState === GAME_STATE.LOST) {
      return <p>Game Over. Better luck next time!</p>;
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>MADE BY Siddharth FOR MPAC Technical Assessment</h1>
      <ul>
        <li>
          <p>1. Reload the page to play again</p>
        </li>
        <li>
          <p>2. Use keyboard to enter values (Enter, Backspace, a-zA-Z)</p>
        </li>
      </ul>

    {currentGuess && <p>{"Your current guess is " + currentGuess + " "}</p>}

      {renderGameStatus()}

      {isLoading && <div>Loading...</div>}

      {error && <Error errorVal={error.message}></Error>}

      <Board
        attempt={attempt}
        currentGuess={currentGuess}
        previousGuesses={previousGuesses}
      />
    </div>
  );
}

export default Wordle;
