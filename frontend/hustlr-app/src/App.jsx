import { useState } from 'react'
import Navbar from './Navbar'
import Home from './Home'

import './App.css'

function App() {
  return (
    <>
    <div className="min-h-screen bg-base-200">
      <Navbar />
      <Home />
    </div>
    </>
  )
}

export default App
