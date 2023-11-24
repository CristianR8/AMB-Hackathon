import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'
import Segmentation from './components/Segmentation'
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/segmentation" element={<Segmentation/>}/>
      </Routes>
    </Router>
  )
}

export default App;
