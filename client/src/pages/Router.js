import {BrowserRouter as Router, Switch} from 'react-router-dom'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import React from 'react'
import PrivateRoute from './PrivateRoute'


export default function Routes({isLogined}) {

  const Start = () => {
    if (isLogined) {
      return (
        <PrivateRoute path="/" isLogined>
          <Dashboard/>
        </PrivateRoute>
      )
    } else {
      return (
          <Login/>
      )
    }
  }

  return (
    <Router>
      <Switch>
        <Start/>
      </Switch>
    </Router>
  )
}

