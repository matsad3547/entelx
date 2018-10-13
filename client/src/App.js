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

class App extends Component {

  render() {

    return (
      <div style={styles.root}>
        <div>
          <nav>
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
    );
  }
}

const styles = {
  root: {
    fontFamily: 'Helvetica, Arial',
    fontSize: 16,
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
}

export default App;
