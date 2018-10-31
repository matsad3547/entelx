import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Home from './components/Home'
import Demo from './components/Demo'
import Contact from './components/Contact'
import About from './components/About'
import NavBar from './components/NavBar'

import './App.css'

class App extends Component {

  render() {
    return (
      <div style={styles.root}>
        <NavBar />
        <div>
          <Route
            exact path="/"
            component={Home}
          />
          <Route
            exact path="/demo"
            component={Demo}
          />
          <Route
            exact path="/about"
            component={About}
          />
          <Route
            exact path="/contact"
            component={Contact}
          />
        </div>
      </div>
    )
  }
}

const styles = {
  root: {
    fontFamily: 'Montserrat, Helvetica, sans-serif',
    fontWeight: 200,
    fontSize: 16,
    // fontSize: '1.5vw',
    textAlign: 'center',
  },
}

export default App;
