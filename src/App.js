import React, { Component } from 'react';
import './App.css';
import Nav from './components/nav/Nav';
import router from './route';

//how to hide nav using history?
class App extends Component {
  render() {
    console.log(this.props.history)
    return (
      <div className="App">
      <Nav />
        { router }
      </div>
    );
  }
}

export default App;
