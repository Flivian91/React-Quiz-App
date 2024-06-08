import React from "react";

function StartScreen({ numQuestions, dispatch, priority, userQuiz }) {
  return (
    <div className="start">
      <h2>Welcome to React quiz!</h2>
      <h3>{numQuestions} questions to test your react mastery</h3>
      <h5>Categorize your questions</h5>
      <div className="category">
        <label>
          Based on Priority
          <select
            value={priority}
            onChange={(e) =>
              dispatch({ type: "priority", payload: e.target.value })
            }
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </label>
        <label>
          Number of Questions
          <select
            value={userQuiz}
            onChange={(e) =>
              dispatch({
                type: "userQuestions",
                payload: Number(e.target.value),
              })
            }
          >
            <option value={numQuestions}>All Questions</option>
            <option value={10}>10.Questions</option>
            <option value={5}>5.Questions</option>
          </select>
        </label>
      </div>
      <button
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Let`s Start
      </button>
    </div>
  );
}

export default StartScreen;
