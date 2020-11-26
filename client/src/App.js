import './App.css'
import Login from './pages/Login/Login'
import React, {useEffect, useState} from 'react'
import Dashboard from './pages/Dashboard/Dashboard'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'


export default function App() {
  const [isLogined, setIsLogined] = useState(false)

  // useEffect(() => {
  //   if (!isLogined) {
  //     let pas = localStorage.getItem('pas')
  //     if (pas === '1') {
  //       setIsLogined(true)
  //     }
  //   }
  // }, [isLogined])

  function check(){
    let pas = localStorage.getItem('pas')
    if (pas === '1') {
      return true
    }
    return false
  }

  function PrivateRoute({children, ...rest}) {

    return (
      <Route
        {...rest}
        render={({location}) =>
          check() ? (
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
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/login">
            {check()?
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
      </Router>
    </div>
  )
}

