import {useState, useEffect, useCallback, useContext} from 'react'
import {useMutation} from '@apollo/client'
import {LOGIN} from '../Login/query'


export default () => {
  const [logined] = useMutation(LOGIN)
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [token, setToken] = useState(false)
  const [login, setLogin] = useState(false)
  const [password, setPassword] = useState(false)

  const doFetch = useCallback(({login = null, password = null, token = ''} = {}) => {
    setLogin(login)
    setPassword(password)
    setToken(token)
    setIsLoading(true)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      return
    }

    logined({
      variables: {
        login,
        password,
        token,
      },
    })
      .then(({data}) => {
        if(data.loginUser.token !== 'fail'){
          setResponse(data.loginUser)
        }
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setError(error)
        setIsLoading(false)
      })
  }, [isLoading, login, password, token])

  return [{isLoading, response, error}, doFetch]
}
