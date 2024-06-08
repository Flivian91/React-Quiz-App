import React, { useContext } from "react";
import { QuestionsDispatchContext, StateContext } from "./QuestionProvider";

function Options({ question }) {
  const dispatch = useContext(QuestionsDispatchContext);
  const { answer} = useContext(StateContext);

  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          disabled={hasAnswered}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
