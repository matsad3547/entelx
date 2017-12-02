import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      res: '',
      loading: false,
      loaded: false,
      // currentUser: null,
    }
    this.fetchUser = this.fetchUser.bind(this)
  }
  componentWillMount(){
    this.setState({
      loading: true,
    })
    this.fireQuery()
    // this.fetchUser()
  }

  fireQuery(){
    fetch('api')
    .then( res => {
      console.log('res:',
      res,
      '\njson:',
      res.json()
      // JSON.parse(res.files)
    );
      // this.setState({
      //   loading: false,
      //   res,
      // })
    })
    .catch( error => {
      console.error('There was an error loading user data:', error)
      this.setState({
        error,
        loading: false,
      })
    })
  }

  fetchUser(){
    fetch('https://api.github.com/gists/3f9676cf0438778fab39a8235fff6f2d')
    .then( res => res.json() )
    .then( res => {
       const currentUser = JSON.parse(res.files['Charteco-Demo-User'].content)
       this.setState({
         loading: false,
         loaded: true,
         currentUser,
       })
    })
    .catch( error => {
      console.error('There was an error loading user data:', error)
      this.setState({
        error,
        loading: false,
        loaded: false,
      })
    })
  }

  render() {

    console.log('user:', this.state.currentUser);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Words and things!
          {this.state.currentUser ? this.state.currentUser.userFullName : '...waiting'}
        </p>
      </div>
    );
  }
}

export default App;
