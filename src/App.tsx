import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { setFitsBoardPerfectly } from "./lib/util";
import Paw from "./lib/keyboards/Paw";
import Alpha26 from "./lib/keycapSets/Alpha26";
import Arrows from "./lib/keycapSets/Arrows";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {[Alpha26, Arrows].map((keycapSet, index) => (
          <p key={index}>
            {`${keycapSet.name} ${
              setFitsBoardPerfectly(keycapSet, Paw) ? "fits" : "does not fit"
            } ${Paw.name}`}
          </p>
        ))}
      </header>
    </div>
  );
}

export default App;
