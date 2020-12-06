import './App.css'
import Routes from './pages/Router'
import {useEffect, useState} from 'react'
import {useMutation} from '@apollo/client'
import {LOGIN} from './pages/Login/query'

export default function App(){
  const [isLogined, setisLogined] = useState(false)
  const [logined] = useMutation(LOGIN)

  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      setisLogined(true)
      logined({
        variables: {
          token
        },
      }).then(({data}) => {
        if(data.loginUser.token === 'ok'){
          setisLogined(true)
        }else{
          setisLogined(false)
        }
      })
    } else {
      setisLogined(false)
    }
  }, [])

  return (
    <div className="App">
      <Routes isLogined={isLogined}/>
    </div>
  )
}
