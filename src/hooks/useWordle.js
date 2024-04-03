import { useReducer, useEffect } from "react";
import { MAX_ATTEMPTS, WORD_LENGTH } from "../utilities/constants";
import { API_ROUTE } from "../utilities/constants";

function wordleReducer(state, action) {
  switch (action.type) {
    case "ADD_CHARACTER_TO_CURRENT_GUESS":
      if (
        state.attempt <= MAX_ATTEMPTS &&
        state.currentGuess.length < WORD_LENGTH
      ) {
        return {
          ...state,
          currentGuess: state.currentGuess + action.payload,
          isLoading: false,
          error: null,
        };
      }

      // DO NOTHING IS NOT VALID
      return { ...state };
    case "DEL_CHARACTER_FROM_CURRENT_GUESS":
      let new_current = state.currentGuess.slice(0, -1);
      return {
        ...state,
        currentGuess: new_current,
        isLoading: false,
        error: null,
      };
    case "SUBMIT_GUESS_START":
      return { ...state, error: null, isLoading: true };
    case "SUBMIT_GUESS_SUCCESS":
      const { is_valid_word, score } = action.payload;
      let nextAttempt = state.attempt + 1;
      let solutionArray = [...state.previousGuesses];

      if (is_valid_word) {
        solutionArray[state.attempt] = {
          word: state.currentGuess,
          score: action.payload.score,
        };

        // CHECK IF THE GAME IS WON
        if (score.every((ele) => ele === 2)) {
          return {
            ...state,
            previousGuesses: solutionArray,
            currentGuess: "",
            attempt: nextAttempt,
            gameState: "won",
            isLoading: false,
            error: null,
          };
        }

        // CHECK IF THE GAME IS LOST BY EXHAUSTING MAX ATTEMPTS
        if (nextAttempt >= MAX_ATTEMPTS) {
          return {
            ...state,
            previousGuesses: solutionArray,
            currentGuess: "",
            attempt: nextAttempt,
            gameState: "lost",
            isLoading: false,
            error: null,
          };
        }

        // Game is still ongoing
        return {
          ...state,
          previousGuesses: solutionArray,
          currentGuess: "",
          attempt: nextAttempt,
          isLoading: false,
          error: null,
        };
      } else {
        // HANDLE INVALID WORD WITHOUT CHANING attempt OR gamesState
        return {
          ...state,
          isLoading: false,
          error: { message: "This is not a valid word." },
        };
      }
    case "HANDLE_ERROR":
      return {
        ...state,
        error: { message: action.payload },
        isLoading: false,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return state;
  }
}

function useWordle() {
  // SETTING INITIAL STATE
  const initialState = {
    currentGuess: "",
    previousGuesses: Array(MAX_ATTEMPTS).fill(null), // [{word: "", score: [0-2, 0-2, 0-2, 0-2, 0-2]}, ...]
    attempt: 0, // 0-5
    gameState: "on-going", // "won"/"lost"/"on-going"
    isLoading: false,
    error: null,
  };

  const [wordleState, wordleDispatch] = useReducer(wordleReducer, initialState);

  const handleError = (message) => {
    wordleDispatch({
      type: "HANDLE_ERROR",
      payload: message,
    });
  };

  async function validateGuess(guess) {
    const response = await fetch(API_ROUTE, {
      method: "POST",
      body: JSON.stringify({ guess }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to validate guess.");
    const responseData = await response.json();
    return responseData;
  }

  const submitGuess = async () => {
    wordleDispatch({ type: "SUBMIT_GUESS_START" });
    try {
      const resData = await validateGuess(wordleState.currentGuess);
      wordleDispatch({ type: "SUBMIT_GUESS_SUCCESS", payload: { ...resData } });
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleKeyDown = ({ key }) => {
    // NO CHANGED REGISTERED WHEN LOADING OR WHEN THE GAME IS OVER
    if (wordleState.isLoading || wordleState.gameState !== 'on-going') return;
    if (/^[a-zA-Z]$/.test(key)) {
      wordleDispatch({
        type: "ADD_CHARACTER_TO_CURRENT_GUESS",
        payload: key,
      });
    } else if (key === "Backspace") {
      wordleDispatch({ type: "DEL_CHARACTER_FROM_CURRENT_GUESS" });
    } else if (key === "Enter") {
      if (wordleState.attempt > MAX_ATTEMPTS) {
        handleError("Max attempts reached.");
      } else if (wordleState.currentGuess.length < WORD_LENGTH) {
        handleError("Word must be " + WORD_LENGTH + " letters long.");
      } else {
        submitGuess();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, wordleState.gameState]);

  useEffect(() => {
    if (wordleState.error && wordleState.error.message) {
      alert(wordleState.error.message);
    }
  }, [wordleState.error]);

  return { ...wordleState };
}

export default useWordle;
