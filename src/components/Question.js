import React from 'react';

export default function Question(props) {
  return (
    <div>
      <h3>{props.question}</h3>
      <p>{props.options}</p>
    </div>
  );
}
