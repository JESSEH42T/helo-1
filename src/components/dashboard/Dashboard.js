import React, { Component } from 'react';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      checked: true,
      posts: []
    }
  }



  render() {
    // const list = this.state.posts.map((item, i) => {
    //   return (
    //     <div>
    //       <p>Post title: {item.title}</p>
    //       <p>Author name: {item.username}</p>
    //     </div>
    //   )
    // })
    return (
      <div>
        <input type="text"/>
        <button>Search</button>
        <button>Reset</button>
        My posts<input type="checkbox"/>
      </div>
    );
  }
}

export default Dashboard;