import React from 'react'
import { Route } from 'react-router-dom'

import Home from './components/Home'
import Demo from './components/Demo'
import Contact from './components/Contact'
import About from './components/About'
import NavBar from './components/NavBar'

import SystemAdmin from './containers/SystemAdmin'

import './App.css'

const App = () => (

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

const styles = {
  root: {
    fontFamily: 'Montserrat, Helvetica, sans-serif',
    fontWeight: 200,
    // fontSize: '1.3vw',
    fontSize: 16,
    textAlign: 'center',
    overflow: 'hidden',
  },
}

export default App;
