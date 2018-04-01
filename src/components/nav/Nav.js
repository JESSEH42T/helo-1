import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = (props) => {
    return (
      <div>
        <Link to='/dashboard'><button>Home</button></Link>
        <Link to='/new'><button>New Post</button></Link>
        <Link to='/'><button>Logout</button></Link>
        <p>Username: {props.username}</p>
        <img src={props.profile_pic} alt="" style={{width: 100}}/>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    password: state.password,
    profile_pic: state.profile_pic
  }
}

export default connect(mapStateToProps)(Nav);