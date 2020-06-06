import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Render from './Render';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Render></Render>
        <p>Hey this spinning keyboard is pretty hype, right?</p>
        <a
          className="App-link"
          href="https://github.com/FrancisUsher/react-site-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribute to this project on GitHub!
        </a>
      </header>
    </div>
  );
}

export default App;
