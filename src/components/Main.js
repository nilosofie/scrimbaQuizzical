import React from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';
import quizData from '../data';

export default function Main(props) {
  const [quizState, setQuizState] = React.useState();

  const getApiQuiz = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=5').then(
      (response) => response.json()
    );

    setQuizState(response);
  };

  React.useEffect(() => {
    getApiQuiz();
    // console.log(quizData);
    // setQuizState(quizData);
  }, []);

  const questionElements = quizState ? (
    quizState.results.map((questionSet) => (
      <Question
        question={questionSet.question}
        correct={questionSet.correct_answer}
        incorrect={questionSet.incorrect_answers}
        key={nanoid()}
      />
    ))
  ) : (
    <h3>Loading...</h3>
  );

  return (
    <div className="main-div">
      {/* <pre>{JSON.stringify(quizState.results, null, 2)}</pre> */}
      <div>{questionElements}</div>

      <button onClick={props.handleIntro} className="btn">
        Check Awnsers
      </button>
    </div>
  );
}
