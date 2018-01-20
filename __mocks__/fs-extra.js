const fs = jest.genMockFromModule("fs-extra")

let file = `
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
`

const setFileContent = content => {
  file = content
}

const readFileSync = jest.fn(() => file)

fs.setFileContent = setFileContent
fs.readFileSync = readFileSync

module.exports = fs
