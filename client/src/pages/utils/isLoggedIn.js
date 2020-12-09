import {useQuery} from '@apollo/client'
import {LOGIN} from '../Login/query'
import Dashboard from '../Dashboard/Dashboard'
import React from 'react'
import {Redirect} from 'react-router-dom'


export default function IsLoggedIn() {

  const {loading, error, data} = useQuery(LOGIN, {
    variables: {
      login: 'z',
      password: 'z',
      token: '',
    },
    fetchPolicy: 'network-only',
  })

  if (loading) return <p>Loading ...</p>
  if (error) return <p>error ...</p>

  return (
    <div>
      {(loading || data.loginUser.error)
        ? <Redirect to='login'/>
        : <Dashboard/>
      }
    </div>
  )
}
