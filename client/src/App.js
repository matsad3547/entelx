import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import Home from './components/Home'
import Demo from './components/Demo'

import './App.css'

class App extends Component {

  render() {

    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <nav style={styles.nav}>
            <Link to="/">Home</Link>
            <Link to="/demo">Demo</Link>
          </nav>
        </div>
        <div>
          <Route
            exact path="/"
            component={Home}
          />
          <Route
            exact path="/demo"
            component={Demo}
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
    textAlign: 'center',
  },
  nav: {
    display: 'inline-flex',
    width: '8em',
    justifyContent: 'space-between',
    padding: '1em 3em',
  },
  header: {
    textAlign: 'right',
  },
}

export default App;
