import {useQuery} from '@apollo/client'

const {LOGIN} = require('./query')

function FetchAuth(login = '', password = '') {
  const token = localStorage.getItem('token')

  if(!token){
    localStorage.setItem('token', '')
  }

  if(login && password && token){
    localStorage.setItem('token', '')
  }

  const {loading, error, data} = useQuery(LOGIN, {
      variables: {
        login: login,
        password: password,
        token: token,
      },
      onCompleted: (data) => {
        if (data.loginUser.token) {
          localStorage.setItem('token', data.loginUser.token)
        }
      }
    }
  )
  return {loading, error, data}
}

export default FetchAuth
