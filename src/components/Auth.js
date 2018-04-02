import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer' ;

class Auth extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      profile_pic: ''
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
      password: this.state.password,
      profile_pic: `https://robohash.org/${this.state.username}.png`
    }
    axios.post('/api/auth/register', user)
      .then(res => {
        this.props.getUserInfo(res.data[0]);
      });
    this.setState({
      username: '',
      password: '',
      profile_pic: `https://robohash.org/${this.state.username}.png`
    });
  }

  handleLogin() {
    let user = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('/api/auth/login', user)
      .then(res => {
        if (res.data[0]) {
          this.props.getUserInfo(res.data[0])
        } 
      });
    this.setState({
      username: '',
      password: ''
    });
  }

  render() {
    return (
      <div className="auth">
        <div className="auth__box">
        fdfdfdf
          <input type="text" name="username" onChange={this.handleInput.bind(this)} /> 
          <input type="text" name="password" onChange={this.handleInput.bind(this)} /> 
          <Link to='/dashboard'><button  onClick={this.handleRegister.bind(this)}>Register</button></Link>
          <Link to='/dashboard'><button  onClick={this.handleLogin.bind(this)}>Login</button></Link>
        </div>
      </div>
    );
  }
}

export default connect(null, {getUserInfo})(Auth);