import './App.css'
import Login from './pages/Login/Login'
import React, {useEffect, useState} from 'react'
import Dashboard from './pages/Dashboard/Dashboard'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'



function App() {
  const [isLogined, setIsLogined] = useState(false)

  useEffect(() => {
    if (!isLogined) {
      let pas = localStorage.getItem('pas')
      if (pas === '1') {
        setIsLogined(true)
      }
    }
  },[isLogined])

  return (
    <div className="App">
      <Router>
        {isLogined ?
          <Redirect to="/home" />
          :
          <Redirect to="/login" />
        }
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
