import React, { Component } from 'react'

import {
  fieldOnchange,
  singlePostRequest,
  setError,
} from '../utils/'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      loading: false,
      error: '',
    }
    this.fieldOnchange = fieldOnchange.bind(this)
    this.setError = setError.bind(this)
    this.login = this.login.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
  }

  handleResponse(res) {
    console.log('success!', res.status)
    this.setState({
      username: '',
      password: '',
    })
  }

  login() {
    console.log('logging in');
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
    singlePostRequest('/login/', request, this.handleResponse, this.setError)
  }

  render() {

    const {
      username,
      password,
    } = this.state

    return (
      <form className="createUser">
        <h1>Login</h1>
        <input type="text" id="username" placeholder="username" value={username} onChange={this.fieldOnchange}/>
        <input type="password" id="password" placeholder="password" value={password} onChange={this.fieldOnchange}/>
        <input type="button" value="Login" onClick={this.login}/>
      </form>
    )
  }
}

export default Login
