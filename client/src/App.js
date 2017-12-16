import React, { Component } from 'react'
import './App.css'
import { Link, Route } from 'react-router-dom'

import CreateProfile from './containers/CreateProfile'
import Login from './containers/Login'

import {
  singleGetRequest,
  setError,
} from './utils/'

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: null,
      loading: false,
      error: '',
    }
    this.setApiData = this.setApiData.bind(this)
    this.setError = setError.bind(this)
  }

  componentWillMount(){
    this.setState({
      loading: true,
    })
    singleGetRequest('/api/', {}, this.setApiData, this.setError)
  }

  setApiData(data) {
    this.setState({
      loading: false,
      data,
    })
  }

  render() {

    return (
      <div className="App">
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/create_user">Sign Up</Link>
            <Link to="/login">Login</Link>
          </nav>
        </div>
        <p className="App-intro">
          Words and things!
          {this.state.data ? `\n${Object.keys(this.state.data)
                .map( k => `${k}: ${this.state.data[k]}`)}` : '...waiting'}
        </p>
        <div>
          <Route path="/create_user" component={CreateProfile} />
          <Route path="/login" component={Login} />
        </div>
      </div>
    );
  }
}

export default App;
