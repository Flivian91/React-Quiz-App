import React, { useContext } from "react";
import { StateContext } from "./QuestionProvider";

function Progress({maxPossiblePoints}) {
  const { index, numQuestions, points, answer } =
    useContext(StateContext);
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
