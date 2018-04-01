import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      myPosts: false,
      posts: []
    }
  }

  componentDidMount() {
    this.requestPosts();
  }

  requestPosts() {
    axios.get(`/api/posts/${this.props.id}?myposts=${this.state.myPosts}&search=${this.state.search}`)
      .then(res => {
        this.setState({posts: res.data});
      })
  }

  resetSearch() {
    axios.get(`/api/posts/${this.props.id}?mypost=${this.state.myPosts}`)
      .then(res => {
        this.setState({posts: res.data, search: ''});
      })
  }

  render() {
    const list = this.state.posts.map((item, i) => {
      return (
        <Link to={`/post/${item.id}`} key={item.id}><div >
          <p>Post title: {item.title}</p>
          <p>Author name: {item.username}</p>
          <img src={item.profile_pic} alt=""/>
        </div></Link>
      )
    })

    return (
      <div>
        <input type="text" onChange={(e) => this.setState({search: e.target.value})}/>
        <button onClick={this.requestPosts.bind(this)}>Search</button>
        <button onClick={this.resetSearch.bind(this)}>Reset</button>
        My posts<input type="checkbox" onClick={() => this.setState({myPosts: !this.state.myPosts})}/>
        { list }
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    id: state.id
  }
}

export default connect(mapPropsToState)(Dashboard);