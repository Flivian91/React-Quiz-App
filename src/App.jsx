import { useEffect, useReducer, useState } from "react";
import "./index.css";
// import DateCounter from './components/Header'
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextQuestion from "./components/NextQuestion";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import {
  QuestionsDispatchContext,
  StateContext,
} from "./components/QuestionProvider";
const SEC_PER_QUIZ = 30;
const initialState = {
  questions: [],
  // "Loading", "error", "ready", "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  priority: "high",
  userQuiz: 40,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      return {
        ...state,
        questions: action.payload.slice(0, state.userQuiz),
        status: "ready",
      };
    }
    case "dataFailed": {
      return {
        ...state,
        status: "error",
      };
    }
    case "start": {
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUIZ,
      };
    }
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }
    case "finish": {
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }
    case "restart": {
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    }
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    }
    case "priority": {
      return {
        ...state,
        priority: action.payload,
      };
    }
    case "userQuestions": {
      return {
        ...state,
        userQuiz: action.payload,
      };
    }
    default:
      throw Error("Action is Unkown");
  }
}
function App() {
  /**{
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      priority,
      userQuiz,
    } */
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(function () {
    fetch("http://localhost:5000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  const numQuestions = state.questions.length;
  const maxPossiblePoints = state.questions.reduce(
    (cur, acc) => cur + acc.points,
    0
  );
  return (
    <StateContext.Provider value={state}>
      <QuestionsDispatchContext.Provider value={dispatch}>
        <div>
          <Header />
          <Main>
            {state.status === "loading" && <Loader />}
            {state.status === "error" && <Error />}
            {state.status === "ready" && (
              <StartScreen numQuestions={numQuestions} />
            )}
            {state.status === "active" && (
              <>
                <Progress maxPossiblePoints={maxPossiblePoints} />
                <Question />
                <Footer>
                  <Timer />
                  <NextQuestion numQuestions={numQuestions} />
                </Footer>
              </>
            )}
            {state.status === "finished" && (
              <FinishedScreen
                maxPossiblePoints={maxPossiblePoints}
              />
            )}
          </Main>
        </div>
      </QuestionsDispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
