import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Approval from './Approval';
import Deployment from './Deployment';

class App extends Component {
  render() {
    return (
        <React.Fragment>
            <Deployment />
            <Approval />
        </React.Fragment>
    );
  }
}

export default App;
