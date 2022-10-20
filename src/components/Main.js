import React from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';
// import quizData from '../data';

//Component==============================================================================================

export default function Main(props) {
  //States----------------------------------------------------------------------------------------
  const [quizState, setQuizState] = React.useState();
  const [markState, setMarkState] = React.useState(false);
  const [quizElements, setQuizElements] = React.useState();

  //UseEffects----------------------------------------------------------------------------------------------
  React.useEffect(() => {
    getApiQuiz();
    // console.log(quizData);
    // setQuizState(quizData);
  }, []);

  React.useEffect(() => {
    setQuizElements(
      quizState ? (
        quizState.results.map((questionSet) => (
          <Question
            question={questionSet.question}
            correct={questionSet.correct_answer}
            incorrect={questionSet.incorrect_answers}
            key={nanoid()}
            markState={markState}
          />
        ))
      ) : (
        <h3>Loading...</h3>
      )
    );
  }, [markState, quizState]);

  //Functions-------------------------------------------------------------------------------------------------

  const getApiQuiz = async () => {
    const response = await fetch('https://opentdb.com/api.php?amount=5').then(
      (response) => response.json()
    );

    setQuizState(response);
  };

  // Handlers----------------------------------------------------------------------------------------------
  function handleMarkState() {
    setMarkState((old) => !old);
  }

  //Elements------------------------------------------------------------------------------------------------

  // const questionElements = quizState ? (
  //   quizState.results.map((questionSet) => (
  //     <Question
  //       question={questionSet.question}
  //       correct={questionSet.correct_answer}
  //       incorrect={questionSet.incorrect_answers}
  //       key={nanoid()}
  //     />
  //   ))
  // ) : (
  //   <h3>Loading...</h3>
  // );

  //Render-----------------------------------------------------------------------------------------------

  return (
    <div className="main-div">
      {/* <pre>{JSON.stringify(quizState.results, null, 2)}</pre> */}
      <div>{quizElements}</div>
      <p>markState {markState ? 'True' : 'False'}</p>
      <button onClick={handleMarkState} className="btn">
        Check Awnsers
      </button>
    </div>
  );
}
