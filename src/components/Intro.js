import React from 'react';

export default function Intro(props) {
  return (
    <div>
      <h1>Quizzical</h1>
      <p>Some description would be nice</p>
      <button onClick={props.handleIntro}>Start quiz</button>
    </div>
  );
}
