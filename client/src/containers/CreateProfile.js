import React, { Component } from 'react'

import {
  fieldOnchange,
  singlePostRequest,
  setError,
} from '../utils/'

class CreateProfile extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      verifyPassword: '',
      location: [],
      loading: false,
      error: '',
    }
    this.fieldOnchange = fieldOnchange.bind(this)
    this.setError = setError.bind(this)
    this.createUser = this.createUser.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
  }

  handleResponse(res) {
    console.log('success!', res.status)
    this.setState({
      username: '',
      password: '',
    })
  }

  createUser() {
    console.log('creating user');
    const body = JSON.stringify({
      username: this.state.username,
      password: this.state.password,
    })
    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body,
    }
    this.setState({
      loading: true,
    })
    singlePostRequest('/createUser/', request, this.handleResponse, this.setError)
  }

  render() {

    const {
      username,
      password,
    } = this.state

    return (
      <form className="createUser">
        <h1>Create your user profile</h1>
        <input type="text" id="username" placeholder="username" value={username} onChange={this.fieldOnchange}/>
        <input type="password" id="password" placeholder="password" value={password} onChange={this.fieldOnchange}/>
        <input type="button" value="Create your profile" onClick={this.createUser}/>
      </form>
    )
  }
}

export default CreateProfile
