import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  constructor() {
    super();
    this.state = {
      post: {
        title: '',
        image: '',
        content: '',
        username: '',
        profile_pic: ''
      }
    }
  }
  
  getInfo = () => {
    console.log('hi')
    console.log(this.props.match.params.id)
    axios.get(`/api/post/${this.props.match.params.id}`, this.state)
      .then(res => {
        this.setState({post: res.data});
      })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <p>Title: {this.state.title}</p>
        <img src={this.state.image} alt=""/>
        <p>Content: {this.state.content}</p>
        <p>Username: {this.state.username}</p>
        <img src={this.state.profile_pic} alt=""/>
      </div>
    );
  }
}

export default Post;