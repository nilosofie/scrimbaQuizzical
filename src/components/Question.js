import React from 'react';

//Component=============================================================================

function Answer(props) {
  const correct = props.stateSet.selected && props.stateSet.correct;

  const selectStyle = props.stateSet.selected ? 'selected' : 'unselected';

  let markStyle = '';

  if (props.markState) {
    markStyle = correct ? 'correct' : 'incorrect';
  }

  const styles = `answer-div ${selectStyle} ${markStyle}`;

  return (
    <div className={styles} onClick={!props.markState && props.selectAns}>
      {/* {<pre>{JSON.stringify(props.stateSet, null, 2)}</pre>} */}
      <div dangerouslySetInnerHTML={{ __html: props.stateSet.value }} />
    </div>
  );
}

//Component==============================================================================

export default function Question(props) {
  //Handler----------------------------------------------------------------------------------

  function handleSelect(id) {
    let locCorrect = false;
    const instance = props.stateSet.ansArr.map((ans) => {
      if (ans.id === id && ans.correct) locCorrect = true;
      return ans.id === id
        ? { ...ans, selected: true }
        : { ...ans, selected: false };
    });

    props.handleAnsSelect({
      qId: props.stateSet.id,
      arrAns: instance,
      correct: locCorrect,
    });
  }

  //Elements----------------------------------------------------------------------------------

  const answerElements = props.stateSet.ansArr ? (
    props.stateSet.ansArr.map((answer) => (
      <Answer
        stateSet={answer}
        key={answer.id}
        selectAns={() => handleSelect(answer.id)}
        markState={props.markState}
      />
    ))
  ) : (
    <p>Loading...</p>
  );

  //Render--------------------------------------------------------------------------
  return (
    <div className="question-div">
      {/* {<pre>{JSON.stringify(props.stateSet, null, 2)}</pre>} */}
      <div dangerouslySetInnerHTML={{ __html: props.stateSet.question }} />
      <div className="question-element">{answerElements}</div>
    </div>
  );
}
