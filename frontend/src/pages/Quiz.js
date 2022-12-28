import React, { useState } from "react";
import "./Quiz1.css";

function Quiz() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    {
      text: "What is 2 * 3",
      options: [
        { id: 0, text: "15", isCorrect: false },
        { id: 1, text: "5", isCorrect: false },
        { id: 2, text: "8", isCorrect: false },
        { id: 3, text: "6", isCorrect: true },
      ],
    },
    {
      text: "What is the Capital of Egypt?",
      options: [
        { id: 0, text: "Egypt", isCorrect: false },
        { id: 1, text: "Cairo", isCorrect: true },
        { id: 2, text: "Alexandria", isCorrect: false },
        { id: 3, text: "Aswan", isCorrect: false },
      ],
    },
    {
      text: "What is 4*4",
      options: [
        { id: 0, text: "8", isCorrect: false },
        { id: 1, text: "16", isCorrect: true },
        { id: 2, text: "2", isCorrect: false },
        { id: 3, text: "4", isCorrect: false },
      ],
    },
    {
      text: "9*9",
      options: [
        { id: 0, text: "81", isCorrect: true },
        { id: 1, text: "61", isCorrect: false },
        { id: 2, text: "51", isCorrect: false },
        { id: 3, text: "18", isCorrect: false },
      ],
    },
    {
      text: "10*10",
      options: [
        { id: 0, text: "100", isCorrect: true },
        { id: 1, text: "1000", isCorrect: false },
        { id: 2, text: "5", isCorrect: true },
        { id: 3, text: "20", isCorrect: false },
      ],
    },
  ];

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className="Quiz">
      {/* 1. Header  */}
      <h1>Trainee Quiz</h1>

      {/* 2. Current Score  */}
      <h2>Score: {score}</h2>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()}>Restart Quiz</button>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.isCorrect)}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Quiz;
