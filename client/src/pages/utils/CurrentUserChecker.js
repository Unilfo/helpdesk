import React, {useEffect, useContext} from 'react'
import useFetch from './useFetch'
import {CurrentUserContext} from './CurrentUser'
import useLocalStorage from './useLocalStorage'

const CurrentUserChecker = ({children}) => {
  const [, setCurrentUserState] = useContext(CurrentUserContext)
  const [{response}, doFetch] = useFetch('')
  const [token] = useLocalStorage('token')

  useEffect(() => {
    console.log('check')
    if (!token) {
      setCurrentUserState(state => ({
        ...state,
        isLoggedIn: false
      }))
      return
    }


    doFetch({token})
    setCurrentUserState(state => ({
      ...state,
      isLoading: true
    }))
  }, [doFetch, setCurrentUserState, token])

  useEffect(() => {
    if (!response) {
      return
    }

    setCurrentUserState(state => ({
      ...state,
      isLoggedIn: true,
      isLoading: false,
      currentUser: response.token
    }))
  }, [response, setCurrentUserState])
  return children
}

export default CurrentUserChecker
