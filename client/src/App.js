import React, { Component } from 'react'
import './App.css'
import fetch from 'isomorphic-fetch'

class App extends Component {
  constructor() {
    super()
    this.state = {
      res: '',
      loading: false,
      loaded: false,
      // currentUser: null,
    }
    this.fireQuery = this.fireQuery.bind(this)
  }
  componentWillMount(){
    this.setState({
      loading: true,
    })
    this.fireQuery()
    // this.fetchUser()
  }

  checkStatus(res){
    if (res.status >= 200 && res.status < 300) {
      return res
    }
    const error = new Error(`HTTP Error ${res.statusText}`)
    error.status = res.statusText;
    error.response = res
    console.log(error)
    throw error
  }

  parseResponse(res){
    return res.json()
  }

  fireQuery(){
    fetch('/api')
    .then(this.checkStatus)
    .then(this.parseResponse)
    .then( res => {
      console.log('res:',
      res,
      '\njson:',
      // res.json()
      // JSON.parse(res)
    );
      this.setState({
        loading: false,
        res,
      })
    })
    .catch( error => {
      // console.error('There was an error loading query data:', error)
      this.setState({
        error,
        loading: false,
      })
    })
  }

  // fetchUser(){
  //   fetch('https://api.github.com/gists/3f9676cf0438778fab39a8235fff6f2d')
  //   .then( res => res.json() )
  //   .then( res => {
  //      const currentUser = JSON.parse(res.files['Charteco-Demo-User'].content)
  //      this.setState({
  //        loading: false,
  //        loaded: true,
  //        currentUser,
  //      })
  //   })
  //   .catch( error => {
  //     console.error('There was an error loading user data:', error)
  //     this.setState({
  //       error,
  //       loading: false,
  //       loaded: false,
  //     })
  //   })
  // }

  render() {


    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Words and things!
          {this.state.res ? `\n${this.state.res.stuff}` : '...waiting'}
        </p>
      </div>
    );
  }
}

export default App;
