import {Switch} from 'react-router-dom'
import React from 'react'
import {Route} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'


function Routes() {

  return (
    <Switch>
      <Route exact path='/login'><Login/></Route>
      <PrivateRoute path="/" comp={Dashboard}></PrivateRoute>
      <PrivateRoute exact path="/home" comp={Dashboard}></PrivateRoute>
    </Switch>
  )
}

export default Routes

