import {Redirect, Route} from 'react-router'
import React from 'react'

export default function PrivateRoute({children, isLogined, ...rest}) {
  return (
    <Route {...rest} render={() => (isLogined
        ? children
        : <Redirect to='/login'/>
    )}/>
  )
}
