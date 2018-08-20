import React, { Component } from 'react'

import {
  fieldOnchange,
  singlePostRequest,
  handleError,
} from '../utils/'

class CreateProfile extends Component {

  state = {
    username: '',
    password: '',
    verifyPassword: '',
    location: [],
    loading: false,
    error: '',
    showError: false,
  }

  handleResponse = res => {
    console.log('success!', res.status)
    this.setState({
      username: '',
      password: '',
      verifyPassword: '',
    })
  }

  setError = err => handleError(this, err)

  createUser = () => {

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
      singlePostRequest('/createUser/', request)
        .then(this.handleResponse)
        .catch(this.setError)
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
          <input type="text" id="username" placeholder="username" value={username} onChange={fieldOnchange.bind(this)}/>
          <input type="password" id="password" placeholder="password" value={password} onChange={fieldOnchange.bind(this)}/>
          <input type="password" id="verifyPassword" placeholder="verify" value={verifyPassword} onChange={fieldOnchange.bind(this)}/>
          <input type="button" value="Create your profile" onClick={this.createUser}/>
        </form>

        <p style={ showError ? { display: 'block'} : {display: 'none'}}>{error}</p>
      </div>
    )
  }
}

export default CreateProfile
