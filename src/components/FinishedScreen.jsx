import React from "react";
function FinishedScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button onClick={()=> dispatch({type: "restart"})} className="btn btn-ui">Restart Quiz</button>
    </>
  );
}
export default FinishedScreen;
