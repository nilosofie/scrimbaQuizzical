import React from 'react';
// import Answer from './Answer';

function Answer(props) {
  return <div className="answer-div unselected">{props.value}</div>;
}

export default function Question(props) {
  const [arrAns, setArrAns] = React.useState(scramble);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
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

  function scramble() {
    const arrScram = [
      {
        id: 0,
        value: props.correct,
        mark: true,
        selected: false,
      },
    ];

    for (let i = 0; i < props.incorrect.length; i++) {
      arrScram.push({
        id: i,
        value: props.incorrect[i],
        mark: false,
        selected: false,
      });
    }

    return shuffle(arrScram);
  }

  const answerElements = arrAns.map((answer) => (
    <Answer value={answer.value} mark={answer.mark} />
  ));

  return (
    <div className="question-div">
      <h3>{props.question}</h3>
      <div className="question-element">{answerElements}</div>
    </div>
  );
}
