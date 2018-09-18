import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'

import CreateProfile from './containers/CreateProfile'
import Login from './containers/Login'
import Caiso from './containers/Caiso'
import Test from './containers/Test'

import Home from './components/Home'
import Button from './components/Button'

class App extends Component {

  render() {

    return (
      <div style={styles.root}>
        <div>
          <nav>
            <Link to="/">
              <Button
                name={'Home'}
              />
            </Link>
            <Link to="/create_user">
              <Button
                name={'Sign Up'}
              />
            </Link>
            <Link to="/login">
              <Button
                name={'Login'}
              />
            </Link>
            <Link to="/caiso">
              <Button
                name={'CAISO'}
              />
            </Link>
          </nav>
        </div>
        <div>
          <Route
            exact path="/"
            component={Home}
          />
          <Route
            path="/caiso"
            component={Caiso}
          />
          <Route
            path="/create_user" component={CreateProfile}
          />
          <Route
            path="/login"
            component={Login}
          />
          <Route
            path="/test"
            component={Test}
          />

        </div>
      </div>
    );
  }
}

const styles = {
  root: {
    fontSize: 16,
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
}

export default App;
