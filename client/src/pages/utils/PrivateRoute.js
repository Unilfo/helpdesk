import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import FetchAuth from './fetchAuth'


const PrivateRoute = ({comp: Component, ...rest}) => {

  const {loading, error, data} = FetchAuth()
  if (loading) return <div>loading ...</div>
  if (error) return <div>error ...</div>


  return (
    <Route
      {...rest}
      render={props =>
        data.loginUser.error && !loading ? (
          <Redirect to="/login"/>
        ) : (
          <Component {...props} user={data.loginUser}/>
        )
      }
    />
  )
}


export default PrivateRoute
