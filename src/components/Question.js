import React from 'react';
import { nanoid } from 'nanoid';
// import Answer from './Answer';

//Component=============================================================================

function Answer(props) {
  const styles = props.selected
    ? 'answer-div selected'
    : 'answer-div unselected';

  return (
    <div className={styles} onClick={props.selectAns}>
      {props.value}
    </div>
  );
}

//Component==============================================================================

export default function Question(props) {
  //Sate------------------------------------------------------------
  const [arrAns, setArrAns] = React.useState(scramble);

  //UseEffect-----------------------------------------------------------

  //Functions------------------------------------------------------------

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

  //-----------------------------------------------------------------------------

  function scramble() {
    const arrScram = [
      {
        value: props.correct,
        mark: true,
        selected: false,
        id: nanoid(),
      },
    ];

    for (let i = 0; i < props.incorrect.length; i++) {
      arrScram.push({
        value: props.incorrect[i],
        mark: false,
        selected: false,
        id: nanoid(),
      });
    }
    return shuffle(arrScram);
  }

  //Handler----------------------------------------------------------------------------------

  function handleSelect(id) {
    setArrAns((oldArr) =>
      oldArr.map((ans) => {
        return ans.id === id
          ? { ...ans, selected: true }
          : { ...ans, selected: false };
      })
    );
  }

  //Elements----------------------------------------------------------------------------------

  const answerElements = arrAns.map((answer) => (
    <Answer
      value={answer.value}
      mark={answer.mark}
      selected={answer.selected}
      key={answer.id}
      selectAns={() => handleSelect(answer.id)}
    />
  ));
  //Render--------------------------------------------------------------------------
  return (
    <div className="question-div">
      <h3>{props.question}</h3>
      <div className="question-element">{answerElements}</div>
    </div>
  );
}
