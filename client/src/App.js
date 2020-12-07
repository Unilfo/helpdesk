import React from 'react'
import './App.css'
import Routes from './pages/Routes'
import {CurrentUserProvider} from './pages/utils/CurrentUser'
import CurrentUserChecker from './pages/utils/CurrentUserChecker'
import {BrowserRouter as Router} from 'react-router-dom'


export default function App() {

  return (
    <div className="App">
      <CurrentUserProvider>
        <CurrentUserChecker>
          <Router>
            <Routes/>
          </Router>
        </CurrentUserChecker>
      </CurrentUserProvider>
    </div>
  )
}
