import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

class CreateProfile extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      verifyPassword: '',
      location: '',
    }
    this.userFieldOnchange = this.userFieldOnchange.bind(this)
    this.createUser = this.createUser.bind(this)
  }

  userFieldOnchange(e){
    e.preventDefault()
    this.setState({
      [e.target.id]: e.target.value,
    })
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
        <input type="text" className="username"  id="username" placeholder="username" value={username} onChange={this.userFieldOnchange}/>
        <input type="text" className="password"  id="password" placeholder="password" value={password} onChange={this.userFieldOnchange}/>
        <input type="button" value="Create your profile" onClick={this.createUser}/>
      </form>
    )
  }
}

export default CreateProfile
