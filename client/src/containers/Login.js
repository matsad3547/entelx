import React, { PureComponent } from 'react'

import {
  fieldOnchange,
  singlePostRequest,
  handleError,
} from '../utils/'

class Login extends PureComponent {

  state = {
    username: '',
    password: '',
    loading: false,
    error: '',
  }

  handleResponse = res => {
    console.log('success!', res.status)
    this.setState({
      username: '',
      password: '',
    })
  }

  setError = err => handleError(this, err)

  login = () => {
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
    singlePostRequest('/login/', request)
      .then(this.handleResponse)
      .then(this.setError)
    // singlePostRequest('/login/', request, this.handleResponse, this.setError)
  }

  render() {

    const {
      username,
      password,
    } = this.state

    return (
      <form className="createUser">
        <h1>Login</h1>
        <input type="text" id="username" placeholder="username" value={username} onChange={fieldOnchange.bind(this)}/>
        <input type="password" id="password" placeholder="password" value={password} onChange={fieldOnchange.bind(this)}/>
        <input type="button" value="Login" onClick={this.login}/>
      </form>
    )
  }
}

export default Login
