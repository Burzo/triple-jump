import React from 'react'
import { Mimster } from './components/memes/Memester'
import { Weather } from './components/weather/Weather'
import './index.scss'

function App() {
  return (
    <div className="app">
      {/* <Mimster /> */}
      <Weather />
    </div>
  )
}

export default App
