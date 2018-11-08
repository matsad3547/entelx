import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Home from './components/Home'
import Demo from './components/Demo'
import Contact from './components/Contact'
import About from './components/About'
import NavBar from './components/NavBar'

import SystemAdmin from './containers/SystemAdmin'

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
            path="/demo"
            component={Demo}
          />
          <Route
            path="/about"
            component={About}
          />
          <Route
            path="/contact"
            component={Contact}
          />
          <Route
            path="/system_admin"
            component={SystemAdmin}
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
