import React, { Component } from 'react';
import logo from './logo.svg';
import './Toolbar.css';

class Toolbar extends Component {
  render() {
    return (
      <div className="Toolbar">
        <header className="Toolbar-header">
          <img src={logo} className="Toolbar-logo" alt="logo" />
          <h1 className="Toolbar-title">Welcome to React</h1>
        </header>
        <p className="Toolbar-intro">
          To get started, edit <code>src/Toolbar.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Toolbar;
