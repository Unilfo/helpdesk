import {useMutation} from '@apollo/client'
import {useEffect, useState} from 'react'
const {LOGIN} = require('../Login/query')

function CheckAuth(){
  const check = useMutation(LOGIN)
  const [token, setToken] = useState(false)

  useEffect(()=>{
    setToken(localStorage.getItem('token'))
  },[token])

  console.log(token)
  useEffect(()=>{
    check({
      variables: {
        token,
      },
    })
      .then(({data}) => {
        console.log('check-', data)
      })
      .catch(error => {
        console.log('ERROR - ', error)
      })
  },[])

  return 'asd'
}

export default CheckAuth
