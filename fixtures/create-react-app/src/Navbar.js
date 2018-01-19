import React, { Component } from 'react';
import logo from './logo.svg';
import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <header className="Navbar-header">
          <img src={logo} className="Navbar-logo" alt="logo" />
          <h1 className="Navbar-title">Welcome to React</h1>
        </header>
        <p className="Navbar-intro">
          To get started, edit <code>src/Navbar.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Navbar;
