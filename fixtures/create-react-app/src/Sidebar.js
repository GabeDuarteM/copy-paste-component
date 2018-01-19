import React, { Component } from 'react';
import logo from './logo.svg';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <header className="Sidebar-header">
          <img src={logo} className="Sidebar-logo" alt="logo" />
          <h1 className="Sidebar-title">Welcome to React</h1>
        </header>
        <p className="Sidebar-intro">
          To get started, edit <code>src/Sidebar.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default Sidebar;
