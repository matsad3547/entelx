import React, { Component } from 'react'

import { fieldOnchange, singleRequest } from '../utils/'

class CreateProfile extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      verifyPassword: '',
      location: '',
    }
    this.fieldOnchange = fieldOnchange.bind(this)
    this.createUser = this.createUser.bind(this)
  }

  createUser() {
    console.log('creating user');
  }

  render() {

    const {
      username,
      password,
    } = this.state

    return (
      <form className="createUser">
        <h1>Create your user profile</h1>
        <input type="text" className="username"  id="username" placeholder="username" value={username} onChange={this.fieldOnchange}/>
        <input type="text" className="password"  id="password" placeholder="password" value={password} onChange={this.fieldOnchange}/>
        <input type="button" value="Create your profile" onClick={this.createUser}/>
      </form>
    )
  }
}

export default CreateProfile
