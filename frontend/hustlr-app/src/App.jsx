import { useState } from 'react'
import Navbar from './Navbar'
import Home from './Home'

import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-base-200">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/findwork' element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
