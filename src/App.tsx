import React, { useState } from 'react'
import { Mimster } from './components/memes/Memester'
import { News } from './components/news/News'
import { Weather } from './components/weather/Weather'
import { useInterval } from './hooks/useInterval'
import './index.scss'

function App() {
  return (
    <div className="app">
      <Mimster />
    </div>
  )
}

export default App
