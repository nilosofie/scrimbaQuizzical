import React from 'react';
import Question from './Question';
import { nanoid } from 'nanoid';

//Component==============================================================================================

export default function Main(props) {
  //States----------------------------------------------------------------------------------------
  const [quizState, setQuizState] = React.useState();
  const [markState, setMarkState] = React.useState(false);
  const [marks, setMarks] = React.useState(0);

  //UseEffects----------------------------------------------------------------------------------------------
  React.useEffect(() => {
    getApiQuiz();
  }, []);

  // React.useEffect(() => {
  //   updateMarks();
  // }, [quizState]);

  //Functions-------------------------------------------------------------------------------------------------

  const getApiQuiz = async () => {
    const response = await fetch(
      'https://opentdb.com/api.php?amount=10&category=12'
    ).then((response) => response.json());

    apiToState(response);
  };

  //...................................................................................

  function updateMarks() {
    let sum = 0;
    for (let i = 0; i < quizState.length; i++) {
      if (quizState[i].correct) sum++;
    }
    setMarks(sum);
  }

  //..............................................................................

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }
  //...............................................................
  function getAnsArr(correct, incorrect) {
    const arrScram = [
      {
        value: correct,
        selected: false,
        correct: true,
        id: nanoid(),
      },
    ];

    for (let i = 0; i < incorrect.length; i++) {
      arrScram.push({
        value: incorrect[i],
        selected: false,
        correct: false,
        id: nanoid(),
      });
    }
    return shuffle(arrScram);
  }

  //................................................................
  //................................................................
  function apiToState(obj) {
    const results = obj.results;

    const arrOrder = results.map((questionSet) => ({
      id: nanoid(),
      question: questionSet.question,
      ansArr: getAnsArr(
        questionSet.correct_answer,
        questionSet.incorrect_answers
      ),
      correct: false,
    }));
    console.log('arrOrder - ' + arrOrder);
    setQuizState(arrOrder);
  }

  // Handlers----------------------------------------------------------------------------------------------
  function handleCheck() {
    if (markState) {
      setQuizState();
      setMarks(0);
      getApiQuiz();
    }
    updateMarks();
    setMarkState((old) => !old);
  }

  function handleAnsSelect(obj) {
    console.log(obj);
    setQuizState((oldState) =>
      oldState.map((qSet) => {
        return qSet.id === obj.qId
          ? { ...qSet, ansArr: obj.arrAns, correct: obj.correct }
          : { ...qSet };
      })
    );
    updateMarks();
  }

  //Elements------------------------------------------------------------------------------------------------

  const questionElements = quizState ? (
    quizState.map((questionSet) => (
      <Question
        stateSet={questionSet}
        key={questionSet.id}
        markState={markState}
        handleAnsSelect={handleAnsSelect}
      />
    ))
  ) : (
    <h3 className="score">Loading...</h3>
  );

  //Render-----------------------------------------------------------------------------------------------

  return (
    <div className="main-div">
      {/* {<pre>{JSON.stringify(quizState, null, 2)}</pre>} */}
      <div>{questionElements}</div>
      <h3 className="score">
        {markState && `You scored ${marks}/${quizState.length} correct answers`}
      </h3>
      <button onClick={() => handleCheck()} className="btn">
        {!markState ? 'Check awnsers' : 'Play again'}
      </button>
    </div>
  );
}
