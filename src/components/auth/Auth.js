import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser } from '../../ducks/reducer' ;

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleRegister() {
    let user = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('/api/auth/register', user);
    this.setState({
      username: '',
      password: ''
    });
    this.props.updateUser();
  }

  handleLogin() {
    let user = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('/api/auth/login', user);
    this.setState({
      username: '',
      password: ''
    });
    this.props.updateUser();
  }

  render() {
    return (
      <div>
        <input type="text" name="username" onChange={this.handleInput.bind(this)} /> 
        <input type="text" name="password" onChange={this.handleInput.bind(this)} /> 
        <Link to='/dashboard'><button  onClick={this.handleRegister.bind(this)}>Register</button></Link>
        <Link to='/dashboard'><button  onClick={this.handleLogin.bind(this)}>Login</button></Link>
      </div>
    );
  }
}

export default connect(null, {updateUser})(Auth);