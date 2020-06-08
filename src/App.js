import React from 'react';
// import logo from './logo.svg';
import './App.css';

import CanvasArea from './CanvasArea';
import SelectView from './SelectView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { view: 'layout-editor' };
    this.handleViewChange = this.handleViewChange.bind(this);
  }
  handleViewChange(view) {
    this.setState({ view });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <CanvasArea view={this.state.view}></CanvasArea>
          <SelectView
            view={this.state.view}
            onViewChange={this.handleViewChange}
          ></SelectView>
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
}

export default App;
