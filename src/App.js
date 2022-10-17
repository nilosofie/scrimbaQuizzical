import logo from './logo.svg';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Intro from './components/Intro';
import Main from './components/Main';

function App() {
  const [intro, setIntro] = React.useState(true);

  function handleIntro() {
    setIntro((old) => !old);
  }

  return (
    <div className="App">
      {intro ? (
        <Intro handleIntro={() => handleIntro()} />
      ) : (
        <Main handleIntro={() => handleIntro()} />
      )}
    </div>
  );
}

export default App;
