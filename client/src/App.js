import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import CreateProfile from './containers/CreateProfile'
import Login from './containers/Login'
import Caiso from './containers/Caiso'
import NodeEvaluator from './containers/NodeEvaluator'
import Test from './containers/Test'

import Home from './components/Home'
import Demo from './components/Demo'
import Button from './components/Button'

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
    padding: '1em',
  },
  header: {
    textAlign: 'right',
  },
}

export default App;
