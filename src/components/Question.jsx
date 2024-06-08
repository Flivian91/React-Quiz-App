import React, { useContext } from "react";
import Options from "./Options";
import { QuestionsDispatchContext, StateContext } from "./QuestionProvider";

function Question() {
  // answer={answer}dispatch={dispatch}question={questions[index]}
  const { questions, index } = useContext(StateContext);
  const question = questions[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
}

export default Question;
