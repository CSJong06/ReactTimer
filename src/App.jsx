import { useState } from 'react'
import TimerCard from './Components/common/Card'

import './App.css'

function App() {
  
  return (
    <>
      <img className="background" src="Background.avif"/>
      <div className="rain-overlay"></div>
      <TimerCard />
    </>
  )
}

export default App
