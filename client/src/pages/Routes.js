import {Switch} from 'react-router-dom'
import React, {Fragment, lazy, Suspense} from 'react'
import {Route} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import Login from './Login/Login'
import IsLoggedIn from './utils/isLoggedIn'
import {useQuery} from '@apollo/client'
import {LOGIN} from './Login/query'

const Dashboard = lazy(() => import('./Dashboard/Dashboard'))


function Routes() {
  return (
    <Fragment>
      <IsLoggedIn/>
      <Route exact path="/login" component={Login}/>
      {/*<Switch>*/}
      {/*  <Route exact path="/" component={} />*/}
      {/*</Switch>*/}
    </Fragment>
  )
}

export default Routes

