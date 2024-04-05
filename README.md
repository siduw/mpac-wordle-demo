# Setup

- Framework

  - The project is built with React. Vite is chosen for the project setup, providing a fast and modern development environment with out-of-the-box features like hot module replacement.

- Styling:

  - TailwindCSS is used for styling (utility-first CSS framework for rapid UI development)

## To Run Locally

While in the project root folder:

- npm install
- npm run dev

# Deployed on Vercel

- https://mpac-wordle-demo.vercel.app/

# ToDo

Add More Features: (After Exams)

- Put some effort into UI

- Hard Mode:

  - Original NYT WORDLE Feature: Implement a "Hard Mode" where players must use clues from previous guesses. This mode requires integrating logic to enforce the use of yellow and green letters in subsequent guesses.

- Custom Enhancement:

  - As an added challenge in Hard Mode, hide the yellow colors, making it harder for players to rely on partial matches. This custom feature aims to increase the difficulty for experienced players.

- On-Screen Keyboard for Mobile Players:

  - Enhance accessibility for mobile users by adding an on-screen keyboard.

# Major Design Decisions

## Why "div" tags over something like "input"

- More flexibility
- Custom interactions

## useReducer() vs useState()

- For state management, the decision to use useReducer() over multiple useState() hooks was made to handle the application's state more efficiently and maintainably. While the core functionality of the Wordle Clone could be implemented using useState() and useEffect(), the choice of useReducer() provides several advantages, particularly as the project scales with the addition of new features:

  - Centralized State Management:

    - useReducer() allows for centralizing the state logic in a single reducer function

  - Scalability and Maintainability:

    - As new features (e.g., Hard Mode, on-screen keyboard) are added, the complexity of state management is expected to increase. useReducer() offers a scalable solution that can accommodate this complexity more gracefully than multiple useState() hooks

- CONS
  - A good amount of boilerplate code!

## why useMemo() and useCallback() are not that helpful for a project of this scope and nature

- Simple Computed Values
- Shallow Component Tree
- Not falling for Premature Optimization

## why not use useContext()?

- Not necessarily required as the component tree is not deep enough!
