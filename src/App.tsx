import React from 'react';
// import logo from './logo.svg';
import './App.css';

import CanvasArea from './CanvasArea';
import SelectView from './SelectView';

function App() {
  const [view, setView] = React.useState('layout-editor');
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <CanvasArea view={view}></CanvasArea>
        <SelectView view={view} onViewChange={setView}></SelectView>
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
