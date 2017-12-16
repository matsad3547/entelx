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
      showError: false,
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
      verifyPassword: '',
    })
  }

  createUser() {

    const {
      username,
      password,
      verifyPassword,
    } = this.state

    if (password && password === verifyPassword) {
      console.log('creating user');
      const body = JSON.stringify({
        username,
        password,
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
    else {
      this.setState({
        showError: true,
        error: 'Please verify password',
      })
    }
  }

  render() {

    const {
      username,
      password,
      verifyPassword,
      showError,
      error,
    } = this.state

    return (
      <div>
        <form className="createUser">
          <h1>Create your user profile</h1>
          <input type="text" id="username" placeholder="username" value={username} onChange={this.fieldOnchange}/>
          <input type="password" id="password" placeholder="password" value={password} onChange={this.fieldOnchange}/>
          <input type="password" id="verifyPassword" placeholder="verify" value={verifyPassword} onChange={this.fieldOnchange}/>
          <input type="button" value="Create your profile" onClick={this.createUser}/>
        </form>

        <p style={ showError ? { display: 'block'} : {display: 'none'}}>{error}</p>
      </div>
    )
  }
}

export default CreateProfile
