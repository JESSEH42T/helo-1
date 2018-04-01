import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      imgURL: '',
      content: ''
    }
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  getFormInfo = () => {
    axios.post(`/api/post/${this.props.id}`, this.state)
      .then(res => {
        
      })
  }

  render() {
    return (
      <div>
        <input placeholder="title" type="text" onChange={this.handleInput.bind(this)}/>
        <img src="" width="400" alt=""/>
        <input placeholder="imgURL" type="text" onChange={this.handleInput.bind(this)}/>
        <input placeholder="content" type="text" onChange={this.handleInput.bind(this)}/>
        <button>Post</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id
  }
}
export default connect(mapStateToProps)(Form);