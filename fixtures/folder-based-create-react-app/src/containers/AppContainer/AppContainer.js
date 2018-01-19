import React, { Component } from 'react';
import logo from './logo.svg';
import './AppContainer.css';

class AppContainer extends Component {
  render() {
    return (
      <div className="AppContainer">
        <header className="AppContainer-header">
          <img src={logo} className="AppContainer-logo" alt="logo" />
          <h1 className="AppContainer-title">Welcome to React</h1>
        </header>
        <p className="AppContainer-intro">
          To get started, edit <code>src/AppContainer.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default AppContainer;
