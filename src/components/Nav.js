import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import axios from 'axios';

class Nav extends Component {

  componentDidMount() {
    axios.get('/api/auth/me')
    .then(res => {
      // console.log(this.props) // !!!
      // console.log(res.data)   // !!!
      this.props.getUserInfo(res.data[0]); // !!!
    })
  }

  render () {
    return (
      <div className='nav'>
        <Link to='/dashboard'><button>Home</button></Link>
        <Link to='/new'><button>New Post</button></Link>
        <Link to='/'><button>Logout</button></Link>
        <p>Username: {this.props.username}</p>
        <img src={this.props.profile_pic} alt="" style={{width: 100}}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    profile_pic: state.profile_pic
  }
}

export default connect(mapStateToProps, { getUserInfo })(Nav);