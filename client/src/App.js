import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import Home from './components/Home'
import Demo from './components/Demo'
import Contact from './components/Contact'
import About from './components/About'
import { colors } from './config/styles'

import './App.css'

class App extends Component {

  render() {
console.log(process.env);
    return (
      <div style={styles.root}>
        <div style={styles.header}>
          <nav style={styles.nav}>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/demo" style={styles.link}>Demo</Link>
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
  link: {
    color: colors.text,
    textDecoration: 'none',
  }
}

export default App;
