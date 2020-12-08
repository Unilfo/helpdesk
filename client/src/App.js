import React from 'react'
import './App.css'
import Routes from './pages/Routes'
import {BrowserRouter as Router} from 'react-router-dom'


export default function App() {

  return (
    <div className="App">
      <Router>
        <Routes/>
      </Router>
    </div>
  )
}
