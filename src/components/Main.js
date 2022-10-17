import React from 'react';
import Question from './Question';

export default function Main(props) {
  const [questions, setQuestions] = React.useState(fetchQuestions());

  function fetchQuestions() {
    const arrNewArr = [];
    for (let i = 0; i < 5; i++) {
      arrNewArr.push({
        question: `Question: ${i}`,
        options: [1, 2, 3, 4, 5],
      });
    }
    return arrNewArr;
  }

  const questionElements = questions.map((question) => (
    <Question question={question.question} options={question.options} />
  ));

  return (
    <div>
      {questionElements}

      <button onClick={props.handleIntro}>Check Awnsers</button>
    </div>
  );
}
