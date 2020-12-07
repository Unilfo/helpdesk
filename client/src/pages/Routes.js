import {Switch} from 'react-router-dom'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import React, {useContext, useEffect, useMemo, useState} from 'react'
import {Route} from 'react-router'
import {CurrentUserContext} from './utils/CurrentUser'
import {Redirect} from 'react-router-dom'
import useFetch from './utils/useFetch'

const Routes = () => {
  const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  console.log('currentUserStateRoute', currentUserState)
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)

  function PrivateRoute({children, ...rest}) {

    return (
      <Route
        {...rest}
        render={({location}) =>
          currentUserState.isLoggedIn? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: {from: location},
              }}
            />
          )
        }
      />
    )
  }

  return (
    <Switch>
      {/*<Route exact path='/' component={Dashboard}/>*/}
      {/*<Route path='/login' component={Login}/>*/}
      <Route exact path="/login">
        {currentUserState.isLoggedIn?
          <Redirect
            to={{
              pathname: '/home',
            }}
          /> :<Login/>}
      </Route>
      <PrivateRoute path="/">
        <Dashboard/>
      </PrivateRoute>
    </Switch>
  )
}

export default Routes
