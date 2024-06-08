import React, { useContext } from "react";
import { QuestionsDispatchContext, StateContext } from "./QuestionProvider";

function NextQuestion({ numQuestions }) {
  const { index, answer } = useContext(StateContext);
  const dispatch = useContext(QuestionsDispatchContext);
  if (answer === null) return null;
  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }
  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
}

export default NextQuestion;
