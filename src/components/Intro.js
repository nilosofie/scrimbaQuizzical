import React from 'react';

export default function Intro(props) {
  return (
    <div className="intro-div">
      <h1>Quizzical</h1>
      <p>Some description would be nice</p>
      <button className="btn" onClick={props.handleIntro}>
        Start quiz
      </button>
    </div>
  );
}
