import { useReducer, useEffect } from "react";

import {
  GAME_STATE,
  MAX_ATTEMPTS,
  WORD_LENGTH,
  API_ROUTE,
} from "../utilities/constants";

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

      if (!is_valid_word) {
        return {
          ...state,
          isLoading: false,
          error: { message: "This is not a valid word." },
        };
      }

      solutionArray[state.attempt] = {
        word: state.currentGuess,
        score: action.payload.score,
      };

      let gameState = GAME_STATE.ONGOING; // Default state
      if (score.every((ele) => ele === 2)) {
        gameState = GAME_STATE.WON; // Win condition met
      } else if (nextAttempt >= MAX_ATTEMPTS) {
        gameState = GAME_STATE.LOST; // Lose condition met by exhausting attempts
      }

      return {
        ...state,
        previousGuesses: solutionArray,
        currentGuess: "",
        attempt: nextAttempt,
        gameState: gameState,
        isLoading: false,
        error: null,
      };
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
    gameState: GAME_STATE.ONGOING,
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
      handleError(error.message || "An unknown error occurred");
    }
  };

  const handleKeyDown = ({ key }) => {
    if (wordleState.isLoading || wordleState.gameState !== GAME_STATE.ONGOING)
      return;

    const isLetter = /^[a-zA-Z]$/.test(key);

    if (isLetter) {
      wordleDispatch({
        type: "ADD_CHARACTER_TO_CURRENT_GUESS",
        payload: key.toUpperCase(),
      });
      return;
    } else if (key === "Backspace") {
      wordleDispatch({ type: "DEL_CHARACTER_FROM_CURRENT_GUESS" });
      return;
    } else if (key === "Enter") {
      if (wordleState.currentGuess.length !== WORD_LENGTH) {
        handleError(`Word must be ${WORD_LENGTH} letters long.`);
      } else {
        submitGuess();
      }
    }
  };

  // ADDING LISTENER
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
  
  return { ...wordleState };
}

export default useWordle;
