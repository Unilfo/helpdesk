import './App.css'
import Login from './pages/Login/Login'
import React, {useEffect, useState} from 'react'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  const [isLogined, setIsLogined] = useState(false)

  useEffect(() => {
    if (!isLogined) {
      console.log('проверка')
      let pas = localStorage.getItem('pas')
      if (pas === '123') {
        setIsLogined(true)
      }
    }
  },[])

  return (
    <div className="App">
      {isLogined ?
        <Dashboard/> :
        <Login/>
      }
    </div>
  )
}

export default App
