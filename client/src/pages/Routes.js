import {Switch} from 'react-router-dom'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'
import React, {Fragment, useEffect, useState} from 'react'
import {Redirect, Route} from 'react-router-dom'
import {useMutation} from '@apollo/client'

const {LOGIN} = require('./Login/query')

function Routes(props) {
  console.log('props - ', props)
  const [check] = useMutation(LOGIN)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    async function fetchMyAPI() {
      await check({
        variables: {
          login: '',
          password: '',
          token,
        },
      })
        .then(({data}) => {
          console.log('check-', data)
          setAuth(data.loginUser)
        })
        .catch(error => {
          console.log('ERROR - ', error)
        })
    }

    fetchMyAPI()
  }, [])

  if (auth) {
    console.log('auth', auth)
  }

  return (
    <div>
      {auth.error
        ? (
        <Fragment>
          <Route path="/login" component={Login}/>
          <Redirect to='/login'/>
        </Fragment>
      )
        :(
          <Switch>
            {/*<Route path="/login" component={Login}/>*/}
            <Route path='/' component={Dashboard}/>
          </Switch>
        )}
    </div>
  )
}

export default Routes
// <Switch>
// <Route path="/login" component={Login}/>
// {auth.error
//   ? <Redirect to='/'/>
//   : <Redirect to='/login'/>
// }
// <Route exact path='/' component={Dashboard}/>
// </Switch>
