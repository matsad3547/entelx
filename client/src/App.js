import React from 'react'
import { Route } from 'react-router-dom'

import Home from './components/Home'
import Demo from './containers/Demo'
import {
  About,
  Contact,
} from './textPages/'
import HeaderNavBar from './components/headerNavBar/'

import SystemAdmin from './containers/SystemAdmin'

import './App.css'

const App = () => (

  <div style={styles.root}>
    <HeaderNavBar />
    <React.Fragment>
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
    </React.Fragment>
  </div>
)

const styles = {
  root: {
    fontFamily: 'Montserrat, Helvetica, sans-serif',
    fontWeight: 200,
    // fontSize: '1.3vw',
    fontSize: 14,
    textAlign: 'center',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}

export default App;
